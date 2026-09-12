// Read-only audit: imports the production engine and settlement without modifying them.
import fs from 'node:fs';
import {applyDecisions,rebuildStats,optimizeEquipment,counters} from './decisions.mjs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {D,hero,simulate,equipItem} from '../../docs/engine.js';
import {ensureArena,acquireItem} from '../../docs/hero-state.js';
import {settle} from '../../docs/progression.js';
const arg=(name,fallback)=>process.argv.find(x=>x.startsWith(`--${name}=`))?.split('=').slice(1).join('=')??fallback;
const profile=arg('profile','offense'),gear=arg('gear','automatic'),symmetric=arg('symmetric','false')==='true';assert(['offense','balanced','resilient'].includes(profile));assert(['automatic','smart'].includes(gear));
const n=Number(arg('per-class',500)),baseSeed=Number(arg('seed',20260913)),out=path.resolve(arg('out','balance/decision-audit/results.json'));
assert(Number.isInteger(n)&&n>0);assert(Number.isInteger(baseSeed));
const policies=arg('policies','cautious').split(',');const classes=arg('classes',D.ACTIVE_CLASSES.join(',')).split(',').map(Number);assert(policies.every(p=>['random','cautious'].includes(p)));assert(classes.every(c=>D.ACTIVE_CLASSES.includes(c)));const mergeDir=arg('merge','');
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
const percentile=(a,q)=>[...a].sort((a,b)=>a-b)[Math.max(0,Math.ceil(q*a.length)-1)];
const wilson=(k,n)=>{const z=1.95996398454,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,e=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [Math.max(0,c-e),Math.min(1,c+e)];};
function rng(seed){let state=seed>>>0;return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}
function choose(h,options,policy){
 const rank=o=>[o.level,(D.ADVANTAGES[o.class].includes(h.class)?1:0)-(D.ADVANTAGES[h.class].includes(o.class)?1:0)];
 let candidates=options;
 if(policy==='cautious'){const sorted=options.map(o=>({o,r:rank(o)})).sort((a,b)=>a.r[0]-b.r[0]||a.r[1]-b.r[1]);candidates=sorted.filter(x=>x.r[0]===sorted[0].r[0]&&x.r[1]===sorted[0].r[1]).map(x=>x.o);}
 return candidates[Math.floor(Math.random()*candidates.length)];
}
// A symmetric experimental arm prepares only living bots before the next fight.
// Every bot retains its inventory, XP, hearts and production career rules.
function prepareBots(h){for(const bot of h.career.pool.members)if(bot.hearts>0){rebuildStats(bot,profile);if(gear==='smart')optimizeEquipment(bot);}}
function career(cls,policy,seed){
 const previous=Math.random;Math.random=rng(seed);
 try{
  const h=hero(1,cls),g={heroes:[h],graveyard:[],temple:[]};ensureArena(h);
  const record={seed,cls,policy,initialItems:h.inventory.map(it=>it.id),cycles:[],fights:0,wins:0,losses:0,draws:0,recovered:0,opponentLevelDeltas:{lower:0,equal:0,higher:0},ghostFights:0};
  let cycle={floor:1,entryHearts:5,entryLevel:1,fights:0,wins:0,losses:0,draws:0};
  while(g.heroes.includes(h)){
   assert(record.fights<150,'Career must terminate in at most 150 matches');assert.equal(h.pending.length,0);
   // Abstract waiting for natural energy regeneration, with no impact on combat.
   h.energy=100;
   if(symmetric)prepareBots(h);
   const options=ensureArena(h).opponents;assert(options.length>0&&options.length<=3);
   const o=choose(h,options,policy),pool=h.career.pool,from=h.career.floor,beforeHearts=h.hearts;
   const idx=pool.members.findIndex(x=>x.id===o.id);assert(pool.meetings[idx]<2);
   record.opponentLevelDeltas[o.level<h.level?'lower':o.level>h.level?'higher':'equal']++;
   record.ghostFights+=Number(o.hearts===0);
   const r=simulate(h,o);const key=r.winner===0?'wins':r.winner===1?'losses':'draws';
   const result=settle(g,h,r,o);record.fights++;record[key]++;cycle.fights++;cycle[key]++;
   assert.equal(h.energy,80);assert(pool.meetings.every(x=>x<=2));
   const remaining=beforeHearts-Number(r.winner===1),s=result.transition?.summary;
   if(s){assert.equal(s.remainingHearts,remaining);assert.equal(s.results.length,10);if(!s.dead&&!s.retired){assert.equal(s.floor,Math.min(15,from+remaining));assert.equal(h.hearts,Math.min(5,remaining+1));record.recovered+=h.hearts-remaining;}}
   else assert.equal(h.hearts,remaining);
   if(result.transition||h.hearts===0){record.cycles.push({...cycle,exitHearts:remaining,exitLevel:h.level,completed:cycle.fights===10,died:h.hearts===0,nextFloor:h.career.floor});cycle={floor:h.career.floor,entryHearts:h.hearts,entryLevel:h.level,fights:0,wins:0,losses:0,draws:0};}
   if(g.heroes.includes(h))applyDecisions(h,result.loot,profile,gear);
   assert.equal(h.hearts,5+record.recovered-record.losses);
  }
  assert.equal(g.graveyard.length+g.temple.length,1);
  record.retired=g.temple.length===1;record.floor=h.career.floor;record.level=h.level;record.hearts=h.hearts;
  assert.equal(record.wins+record.losses+record.draws,record.fights);assert.equal(h.wins,record.wins);assert.equal(h.losses,record.losses);
  if(record.retired){assert.equal(record.floor,15);assert.equal(h.career.pool.played,10);assert(h.hearts>0);}else assert.equal(h.hearts,0);
  return record;
 }finally{Math.random=previous;}
}
function summarize(records){
 const retired=records.filter(r=>r.retired),dead=records.filter(r=>!r.retired),fights=records.reduce((s,r)=>s+r.fights,0),wins=records.reduce((s,r)=>s+r.wins,0),draws=records.reduce((s,r)=>s+r.draws,0);
 const floors=Array.from({length:15},(_,i)=>{const floor=i+1,cycles=records.flatMap(r=>r.cycles.filter(c=>c.floor===floor));return {floor,entered:cycles.length,completed:cycles.filter(c=>c.completed&&!c.died).length,deaths:dead.filter(r=>r.floor===floor).length,matches:cycles.reduce((s,c)=>s+c.fights,0),wins:cycles.reduce((s,c)=>s+c.wins,0),meanEntryHearts:cycles.length?mean(cycles.map(c=>c.entryHearts)):null,meanEntryLevel:cycles.length?mean(cycles.map(c=>c.entryLevel)):null};});
 return {n:records.length,retired:retired.length,retirementRate:retired.length/records.length,retirementCI95:wilson(retired.length,records.length),dead:dead.length,meanFloor:mean(records.map(r=>r.floor)),medianFloor:percentile(records.map(r=>r.floor),.5),reached6:records.filter(r=>r.floor>=6).length,reached11:records.filter(r=>r.floor>=11).length,reached15:records.filter(r=>r.floor===15).length,firstCycleDeaths:records.filter(r=>!r.retired&&r.floor===1).length,meanFights:mean(records.map(r=>r.fights)),medianFights:percentile(records.map(r=>r.fights),.5),p10Fights:percentile(records.map(r=>r.fights),.1),p90Fights:percentile(records.map(r=>r.fights),.9),meanFinalLevel:mean(records.map(r=>r.level)),meanRetiredFights:retired.length?mean(retired.map(r=>r.fights)):null,meanRetiredLevel:retired.length?mean(retired.map(r=>r.level)):null,matches:fights,wins,losses:fights-wins-draws,draws,winRate:wins/fights,ghostFights:records.reduce((s,r)=>s+r.ghostFights,0),opponentLevelDeltas:Object.fromEntries(['lower','equal','higher'].map(k=>[k,records.reduce((s,r)=>s+r.opponentLevelDeltas[k],0)])),floors};
}
const all=[],summary={version:JSON.parse(fs.readFileSync('package.json')).version,sourceCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),baseSeed,profile,gear,symmetric,perClassPerPolicy:n,policies:{},method:{energy:'Wait abstracted; 20 consumed per fight',opponents:'Production 9-member pool, 3 offers, maximum 2 meetings; copies fight every round',rewards:{profile,gear,symmetric,training:'18 fixed sparring duels, nine classes, both sides; distinct from career match RNG',optimization:'Two coordinate passes over owned inventory; preserve current gear unless benchmark score improves',symmetricBots:'Rebuild level-earned stats using profile and optimize owned gear before next round; production item reward offer remains first for bots; dead ghosts are left unchanged'},rerolls:'None, including the free opponent reroll',retirement:'Survive ten matches on floor 15; ten wins not required',seed:'LCG32 per career: baseSeed + class*1000003 + index*7919; same initial seed across policies; UUID/time do not affect outcomes'},validation:{completed:true,invariants:'Energy, legal opponents, maximum meetings, hearts before climb, recovery, floor cap, 150-match termination bound, terminal state, totals'}};
// Reproducibility check excludes UUIDs/timestamps by retaining only outcome data.
assert.deepEqual(career(0,'cautious',baseSeed),career(0,'cautious',baseSeed));
fs.mkdirSync(path.dirname(out),{recursive:true});
for(const policy of policies){const batch=[];summary.policies[policy]={classes:{}};
 for(const cls of classes){const records=mergeDir?fs.readFileSync(path.join(mergeDir,`${policy}-${cls}.ndjson`),'utf8').trim().split('\n').map(line=>JSON.parse(line)):[];if(!mergeDir)for(let i=0;i<n;i++)records.push(career(cls,policy,(baseSeed+cls*1000003+i*7919)>>>0));assert.equal(records.length,n);assert(records.every((r,i)=>r.cls===cls&&r.policy===policy&&r.seed===((baseSeed+cls*1000003+i*7919)>>>0)));if(mergeDir){const metadata=JSON.parse(fs.readFileSync(path.join(mergeDir,`${policy}-${cls}.json`)));assert.equal(metadata.sourceCommit,summary.sourceCommit);assert.equal(metadata.baseSeed,baseSeed);assert.equal(metadata.version,summary.version);}batch.push(...records);summary.policies[policy].classes[cls]={name:D.CLASSES[cls],...summarize(records)};console.log(JSON.stringify({policy,class:D.CLASSES[cls],n,retired:summary.policies[policy].classes[cls].retired,meanFloor:summary.policies[policy].classes[cls].meanFloor}));fs.writeFileSync(out+'.checkpoint',JSON.stringify(summary));}
 summary.policies[policy].overall=summarize(batch);all.push(...batch);
}
summary.decisionCounters={...counters};summary.totalCareers=all.length;summary.totalPlayerMatches=all.reduce((s,r)=>s+r.fights,0);summary.totalPoolMatches=summary.totalPlayerMatches*5;
fs.writeFileSync(out,JSON.stringify(summary,null,2)+'\n');fs.writeFileSync(out.replace(/\.json$/,'.ndjson'),all.map(r=>JSON.stringify(r)).join('\n')+'\n');fs.rmSync(out+'.checkpoint');console.log(JSON.stringify({complete:true,totalCareers:summary.totalCareers,totalPlayerMatches:summary.totalPlayerMatches,out}));
