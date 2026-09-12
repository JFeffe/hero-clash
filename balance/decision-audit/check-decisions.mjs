import fs from 'node:fs';
import assert from 'node:assert/strict';
import {D,hero,randomItem,equipItem,simulate} from '../../docs/engine.js';
import {seeded,rebuildStats,score,optimizeEquipment} from './decisions.mjs';
const previous=Math.random;Math.random=seeded(739311);
const rows=[];
try{
 for(const cls of D.ACTIVE_CLASSES)for(const level of [1,10])for(let i=0;i<20;i++){
  const h=hero(level,cls);rebuildStats(h,'balanced');
  for(let j=0;j<6;j++){const it=randomItem(j%4,Math.max(1,level-j%3),cls);it.rarity=j%3;h.inventory.push(it);assert(equipItem(h,D.ITEMS[it.id].slot,h.inventory.length-1));}
  const auto=structuredClone(h),snapshot=structuredClone(h),currentRandom=Math.random;
  const before=score(h),heldoutBefore=score(h,'holdout');optimizeEquipment(h);const after=score(h),heldoutAfter=score(h,'holdout');
  assert.equal(Math.random,currentRandom);assert(after>=before-1e-9);assert.deepEqual(h.inventory,snapshot.inventory);assert.deepEqual(h.stats,snapshot.stats);
  assert.equal(h.hearts,5);assert.equal(h.level,level);assert.equal(h.xp,snapshot.xp);
  const again=structuredClone(auto);optimizeEquipment(again);assert.deepEqual(again.equipped,h.equipped);
  assert.deepEqual(simulate(auto,h,99731),simulate(auto,h,99731));
  rows.push({cls,level,before:Math.round(heldoutBefore*2)/2,after:Math.round(heldoutAfter*2)/2,changed:auto.equipped.join(',')!==h.equipped.join(',')});
 }
 // Scoring and benchmark construction must not consume the live career RNG stream.
 Math.random=seeded(9983);const h=hero(7,2);const state=Math.random;const expected=state();Math.random=seeded(9983);hero(7,2);score(h);assert.equal(Math.random(),expected);
}finally{Math.random=previous;}
const summary={snapshots:rows.length,heldoutDuelsPerSnapshot:18,heldoutAutomaticScore:rows.reduce((s,r)=>s+r.before,0)/(rows.length*18),heldoutSmartScore:rows.reduce((s,r)=>s+r.after,0)/(rows.length*18),improved:rows.filter(r=>r.after>r.before).length,equal:rows.filter(r=>r.after===r.before).length,worse:rows.filter(r=>r.after<r.before).length,changed:rows.filter(r=>r.changed).length,byClass:Object.fromEntries(D.ACTIVE_CLASSES.map(cls=>{const a=rows.filter(r=>r.cls===cls);return [D.CLASSES[cls],{automatic:a.reduce((s,r)=>s+r.before,0)/(a.length*18),smart:a.reduce((s,r)=>s+r.after,0)/(a.length*18)}];})),checks:'Legal inventory, nondecreasing training score, untouched hero progression/inventory/stats, deterministic selection and untouched career RNG'};
fs.writeFileSync('balance/decision-audit/selector-validation.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary));
