import fs from 'node:fs';
import assert from 'node:assert/strict';
import {D,hero,simulate,canEquip} from '../../docs/engine.js';
import {seeded,rebuildStats} from '../decision-audit/decisions.mjs';
const profiles=['offense','balanced','resilient'],levels=[1,5,10,15,20],n=300,baseSeed=130920261;
const rows=[],oldRandom=Math.random;
try {
 for(const level of levels){
  for(let ai=0;ai<D.ACTIVE_CLASSES.length;ai++)for(let bi=ai+1;bi<D.ACTIVE_CLASSES.length;bi++){
   const aClass=D.ACTIVE_CLASSES[ai],bClass=D.ACTIVE_CLASSES[bi];
   const combinations=level===1?[['balanced','balanced']]:profiles.flatMap(a=>profiles.map(b=>[a,b]));
   const cells=combinations.map(([aProfile,bProfile])=>({level,aClass,bClass,aProfile,bProfile,games:0,wins:0,draws:0,pairScoreSum:0,pairScoreSquares:0,duration:0,firstSideWins:0}));
   for(let k=0;k<n;k++){
    Math.random=seeded(baseSeed+level*1000003+aClass*13007+bClass*11003+k*7919);
    const a=hero(level,aClass),b=hero(level,bClass),seed=Math.floor(Math.random()*2**32);
    for(const h of [a,b])for(const it of h.inventory){it.rarity=k%3;assert(canEquip(h.class,it.id));}
    for(const cell of cells){
     rebuildStats(a,cell.aProfile);rebuildStats(b,cell.bProfile);let score=0;
     for(const side of [0,1]){
      const r=simulate(side?b:a,side?a:b,seed);cell.games++;cell.wins+=Number(r.winner===side);cell.draws+=Number(r.winner<0);cell.duration+=r.duration;cell.firstSideWins+=Number(r.winner===0);score+=r.winner<0?.5:Number(r.winner===side);
     }
     score/=2;cell.pairScoreSum+=score;cell.pairScoreSquares+=score*score;
    }
   }
   rows.push(...cells);
  }
  console.log('Level',level,'complete');
 }
}finally{Math.random=oldRandom;}
assert(rows.every(r=>r.games===2*n&&r.wins+r.draws<=r.games));
const output={version:'0.29.1',baseSeed,profiles,levels,pairsPerCell:n,classes:Object.fromEntries(D.ACTIVE_CLASSES.map(c=>[c,D.CLASSES[c]])),method:'All 36 unordered class pairs; all nine profile combinations after level 1; both sides with identical gear and seed; equal item level and rarity (100 common, 100 uncommon, 100 rare loadouts); uniform compatible gear; no optimization; dog retained; no mirrors.',totalDuels:rows.reduce((s,r)=>s+r.games,0),rows};
fs.writeFileSync(new URL('./results.json',import.meta.url),JSON.stringify(output));
