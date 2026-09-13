import fs from 'node:fs';
import assert from 'node:assert/strict';
import {D,hero,simulate,equipmentPool} from '../../docs/engine.js';
import {seeded,rebuildStats} from '../decision-audit/decisions.mjs';
const rows=[],n=150,baseSeed=513092026;
const old=Math.random;
try{for(const cls of [3,2])for(const level of [1,10,20])for(const profile of level===1?['balanced']:['balanced','resilient']){
 const cells=Array.from({length:4},(_,slot)=>equipmentPool(cls,slot).map(id=>({cls,level,profile,slot,id,games:0,wins:0,draws:0,deltaSum:0,deltaSquares:0,pairs:0}))).flat();
 for(const opponent of D.ACTIVE_CLASSES.filter(c=>c!==cls))for(let k=0;k<n;k++){
  Math.random=seeded(baseSeed+cls*1000003+level*11003+opponent*13007+k*7919);
  const a=hero(level,cls),b=hero(level,opponent);rebuildStats(a,profile);rebuildStats(b,'balanced');
  for(const h of [a,b])for(const it of h.inventory)it.rarity=k%3;
  const seed=Math.floor(Math.random()*2**32);
  function play(h){let score=0,wins=0,draws=0;for(const side of [0,1]){const r=simulate(side?b:h,side?h:b,seed);wins+=Number(r.winner===side);draws+=Number(r.winner<0);score+=r.winner<0?.5:Number(r.winner===side);}return {score:score/2,wins,draws};}
  const reference=play(a);
  for(const c of cells){const h={...a,inventory:a.inventory.map(it=>({...it}))};h.inventory[c.slot].id=c.id;assert(h.inventory.filter((it,i)=>it.id!==a.inventory[i].id).length<=1);
   const r=play(h),delta=r.score-reference.score;c.games+=2;c.wins+=r.wins;c.draws+=r.draws;c.pairs++;c.deltaSum+=delta;c.deltaSquares+=delta*delta;
  }
 }
 rows.push(...cells);console.log(cls,level,profile,'done');
}}finally{Math.random=old;}
fs.writeFileSync(new URL('./results.json',import.meta.url),JSON.stringify({version:'0.29.1',baseSeed,pairsPerOpponent:n,classes:D.CLASSES,items:D.ITEMS.map(x=>x.name),rows,totalCandidateDuels:rows.reduce((s,r)=>s+r.games,0),referenceDuels:24000}));
