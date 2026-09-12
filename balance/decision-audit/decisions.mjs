import assert from 'node:assert/strict';
import {D,hero,simulate,equipItem} from '../../docs/engine.js';
import {acquireItem} from '../../docs/hero-state.js';
export const counters={scoringDuels:0,scoreCalls:0,cacheHits:0,equipmentChecks:0,kept:0,switched:0};
export function seeded(seed){let s=seed>>>0;return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
export function statPattern(cls,profile){const main=D.MAGIC_CLASSES.includes(cls)?2:0;return profile==='offense'?[main]:profile==='balanced'?[main,3,main,1]:profile==='resilient'?[3,main,3,1]:(()=>{throw Error('Unknown profile');})();}
export function allocateOne(h,profile){const points=h.stats.reduce((a,b)=>a+b,0)-D.BASE[h.class].reduce((a,b)=>a+b,0),pattern=statPattern(h.class,profile);h.stats[pattern[points%pattern.length]]++;}
export function rebuildStats(h,profile){h.stats=[...D.BASE[h.class]];for(let level=2;level<=h.level;level++)if(level%5)allocateOne(h,profile);}
const opponents=new Map(),scores=new Map();
function benchmark(level,bank){const key=level+':'+bank;if(opponents.has(key))return opponents.get(key);const previous=Math.random,bankSeed=bank==='train'?781919:94310587,list=[];
 try{for(const cls of D.ACTIVE_CLASSES){Math.random=seeded(bankSeed+level*11003+cls*13007);const o=hero(level,cls);rebuildStats(o,'balanced');list.push(o);}}finally{Math.random=previous;}
 opponents.set(key,list);return list;
}
function signature(h,bank){return [bank,h.class,h.level,h.stats.join(','),...h.equipped.map(i=>{const t=h.inventory[i];return t?[t.id,t.level,t.rarity??0].join('.'):'-';})].join('|');}
export function score(h,bank='train'){
 counters.scoreCalls++;const key=signature(h,bank);if(scores.has(key)){counters.cacheHits++;return scores.get(key);}
 let result=0;for(const [i,o] of benchmark(h.level,bank).entries())for(const side of [0,1]){const seed=(bank==='train'?281557:90388673)+h.level*1009+i*1709+side*8191,r=simulate(side?o:h,side?h:o,seed),win=r.winner<0?.5:Number(r.winner===side),margin=r.hp[side]/r.maxhp[side]-r.hp[1-side]/r.maxhp[1-side];result+=win+margin*.0001;counters.scoringDuels++;}
 if(scores.size>=60000)scores.delete(scores.keys().next().value);scores.set(key,result);return result;
}
export function optimizeEquipment(h){
 // Two coordinate passes; actual owned, compatible items only. No unseen loot or future opponent.
 let current=score(h);counters.equipmentChecks++;
 const before=h.equipped.join(',');
 for(let pass=0;pass<2;pass++){let changed=false;
  for(let slot=0;slot<4;slot++){let best=h.equipped[slot],bestScore=current;const seen=new Set();
   for(let i=0;i<h.inventory.length;i++){const it=h.inventory[i];if(D.ITEMS[it.id].slot!==slot)continue;const token=[it.id,it.level,it.rarity??0].join(':');if(seen.has(token))continue;seen.add(token);if(i===h.equipped[slot])continue;
    const candidate={...h,equipped:[...h.equipped]};assert(equipItem(candidate,slot,i));const trial=score(candidate);if(trial>bestScore+1e-9){best=i;bestScore=trial;}
   }
   if(best!==h.equipped[slot]){assert(equipItem(h,slot,best));current=bestScore;changed=true;}
  }if(!changed)break;
 }
 if(h.equipped.join(',')===before)counters.kept++;else counters.switched++;
 return current;
}
export function applyDecisions(h,loot,profile,gear){
 for(const p of h.pending){if(p.type==='stat')allocateOne(h,profile);else if(p.offers?.length){let it=p.offers[0];
  if(gear==='smart'){let best=-Infinity;for(const offered of p.offers){const trial={...h,inventory:[...h.inventory,offered],equipped:[...h.equipped]};assert(equipItem(trial,D.ITEMS[offered.id].slot,trial.inventory.length-1));const s=score(trial);if(s>best){best=s;it=offered;}}}
  acquireItem(h,it);if(gear==='automatic')assert(equipItem(h,D.ITEMS[it.id].slot,h.inventory.length-1));
 }}h.pending=[];
 if(gear==='automatic'){if(loot)assert(equipItem(h,D.ITEMS[loot.id].slot,h.inventory.indexOf(loot)));}else optimizeEquipment(h);
}
