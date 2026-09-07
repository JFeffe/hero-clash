// Exhaustive gear combinations, concentrated stat investments, equal-rarity pet swaps.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const args=Object.fromEntries(process.argv.slice(2).map(a=>a.split('=')));
const {D,simulate}=await import(pathToFileURL(process.cwd()+'/'+(args.engine??'docs/engine.js')));
const b=()=>({n:0,score:0});let total=b(),byClass=Array.from({length:13},b),byPolicy={},byPet={},byLevel={},byTier={};
for(let cls=0;cls<13;cls++)for(let level of [1,5,10,20])for(let tier of [0,1,2])for(let policy of ['endurance','dexterity','offense'])for(let weapon=0;weapon<6;weapon++)for(let armor=6;armor<10;armor++)for(let object=15;object<19;object++){
 const stats=[...D.BASE[cls]],idx=policy==='endurance'?3:policy==='dexterity'?1:D.MAGIC_CLASSES.includes(cls)?2:0;
 for(let n=2;n<=level;n++)if(n%5)stats[idx]++;
 const h={class:cls,level,stats,name:'Fairy stress',inventory:[weapon,armor,14,object].map(id=>({id,level,rarity:tier})),equipped:[0,1,2,3]};
 for(let pet=10;pet<14;pet++){const q=structuredClone(h);q.inventory[2].id=pet;
 for(let rep=0;rep<2;rep++)for(let side=0;side<2;side++){
 const seed=(931867+cls*710003+level*371+tier*8191+idx*53+weapon*101+armor*13+object*3+rep*190003+side*911)>>>0;
 const r=simulate(side?q:h,side?h:q,seed),score=r.winner<0?.5:r.winner===side?1:0;
 for(const bucket of [total,byClass[cls],byPolicy[policy]??=b(),byPet[pet]??=b(),byLevel[level]??=b(),byTier[tier]??=b()]){bucket.n++;bucket.score+=score;}
 }}
}
const finish=x=>({...x,scorePct:100*x.score/x.n});
const result={seed:931867,replicates:2,total:finish(total),byClass:byClass.map(finish),...Object.fromEntries(Object.entries({byPolicy,byPet,byLevel,byTier}).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([i,b])=>[i,finish(b)]))]))};
fs.writeFileSync(args.out??'balance/fairy-stress.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
