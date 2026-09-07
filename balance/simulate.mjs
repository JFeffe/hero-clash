import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const args=Object.fromEntries(process.argv.slice(2).map(a=>a.split('=')));
const {D,simulate}=await import(pathToFileURL(process.cwd()+'/'+(args.engine??'docs/engine.js')));
const rootSeed=Number(args.seed??73051),N=Number(args.n??12),itemN=Number(args.items??1600),out=args.out??'balance/results.json';
function rng(seed){let state=seed;return ()=>{state|=0;state=state+0x6D2B79F5|0;let t=Math.imul(state^state>>>15,1|state);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
const choose=(a,r)=>a[Math.floor(r()*a.length)],slots=[D.ITEMS.map((_,i)=>i).filter(i=>D.ITEMS[i].slot===0),[6,7,8,9],[10,11,12,13,14],[15,16,17,18]],levels=[1,5,10,20],policies=['mixed','offense','defense'];
function make(cls,level,tier,policy,r){if(args.campaign==='1')policy=choose(policies,r);let stats=[...D.BASE[cls]],off=D.MAGIC_CLASSES.includes(cls)?2:0;for(let n=2;n<=level;n++)if(n%5){let choices=policy==='mixed'?[0,1,2,3,4]:policy==='offense'?[off,off,off,1,3]:[3,3,1,off,1];stats[choose(choices,r)]++;}let inventory=slots.map((ids,slot)=>({id:slot===0&&r()<.55?[0,2,3,1,0,4,4,5,1,5,3,3,4][cls]:choose(ids,r),level,rarity:tier}));if(args.campaign==='1')for(const it of inventory){let t=r();it.rarity=t<.65?0:t<.93?1:2;it.level=1+Math.floor(r()*level);}return {id:'fixture',class:cls,level,stats,name:'Test',look:0,inventory,equipped:[0,1,2,3]};}
const bucket=()=>({n:0,w:0,l:0,d:0,score:0,duration:0,ko:0});
function add(b,r,side=0){b.n++;if(r.winner<0){b.d++;b.score+=.5;}else if(r.winner===side){b.w++;b.score++;}else b.l++;b.duration+=r.duration;if(r.hp.some(v=>v<=0))b.ko++;}
function finish(b){return {...b,scorePct:100*b.score/b.n,winPct:100*b.w/b.n,drawPct:100*b.d/b.n,meanSeconds:b.duration/b.n,koPct:100*b.ko/b.n};}
let matrix=Array.from({length:13},()=>Array.from({length:13},bucket)),byLevel=Object.fromEntries(levels.map(l=>[l,Array.from({length:13},bucket)])),byPolicy=Object.fromEntries(policies.map(p=>[p,Array.from({length:13},bucket)])),byTier={0:Array.from({length:13},bucket),2:Array.from({length:13},bucket)},all=bucket();
for(let a=0;a<13;a++)for(let b=a+1;b<13;b++)for(let level of levels)for(let tier of [0,2])for(let policy of policies)for(let k=0;k<N;k++){
 const seed=(rootSeed+a*87103+b*19391+level*619+tier*31+policies.indexOf(policy)*173+k*100003)>>>0,r=rng(seed),h=make(a,level,tier,policy,r),q=make(b,level,tier,policy,r);
 for(let side=0;side<2;side++){let res=simulate(side?q:h,side?h:q,seed+side*31337);add(matrix[a][b],res,side);add(matrix[b][a],res,1-side);for(const [cls,s] of [[a,side],[b,1-side]]){add(byLevel[level][cls],res,s);add(byPolicy[policy][cls],res,s);add(byTier[tier][cls],res,s);}add(all,res);}
}
const classes=matrix.map((row,i)=>{let total=bucket();row.forEach(b=>{for(const k in total)total[k]+=b[k];});return {id:i,name:D.CLASSES[i],...finish(total)};});
console.log('class sweep',all.n,classes.map(c=>c.name+':'+c.scorePct.toFixed(1)).join(' '));
let items=[],itemTotal=0;
for(let id=0;id<19;id++){let total=bucket(),tiers={0:bucket(),2:bucket()},perClass=Array.from({length:13},bucket);for(let k=0;k<itemN;k++){
 let slot=D.ITEMS[id].slot,seed=(rootSeed+slot*8191+k*9151)>>>0,r=rng(seed),cls=k%13,level=levels[Math.floor(k/13)%4],tier=Math.floor(k/52)%2?2:0,policy=policies[Math.floor(k/104)%3],h=make(cls,level,tier,policy,r),q=structuredClone(h),others=slots[slot].filter(x=>x!==id&&(args.compat!=='1'||slot!==0||x!==(D.MAGIC_CLASSES.includes(cls)?0:3)));if(args.compat==='1'&&slot===0&&id===(D.MAGIC_CLASSES.includes(cls)?0:3))continue;h.inventory[slot]={id,level,rarity:tier};q.inventory[slot]={id:choose(others,r),level,rarity:tier};
 for(let side=0;side<2;side++){let res=simulate(side?q:h,side?h:q,seed+side*31337);add(total,res,side);add(tiers[tier],res,side);add(perClass[cls],res,side);itemTotal++;}
 }items.push({id,name:D.ITEMS[id].name,slot:D.ITEMS[id].slot,...finish(total),tiers:Object.fromEntries(Object.entries(tiers).map(([k,v])=>[k,finish(v)])),perClass:perClass.map(finish)});}
let result={rootSeed,N,itemN,compatible:args.compat==='1',campaign:args.campaign==='1',levels,policies,classDuels:all.n,itemDuels:itemTotal,totalDuels:all.n+itemTotal,overall:finish(all),classes,matrix:matrix.map(row=>row.map(b=>b.n?finish(b):null)),byLevel:Object.fromEntries(Object.entries(byLevel).map(([k,v])=>[k,v.map(finish)])),byPolicy:Object.fromEntries(Object.entries(byPolicy).map(([k,v])=>[k,v.map(finish)])),byTier:Object.fromEntries(Object.entries(byTier).map(([k,v])=>[k,v.map(finish)])),items};
fs.writeFileSync(out,JSON.stringify(result,null,2));console.log('items',items.map(i=>i.name+':'+i.scorePct.toFixed(1)).join(' '));console.log(out,result.totalDuels);
