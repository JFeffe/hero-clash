import fs from 'node:fs';
import {D,hero,simulate} from '../../docs/engine.js';
import {BALANCE as B} from '../../docs/balance.js';
import {seeded,rebuildStats} from '../decision-audit/decisions.mjs';
const targets=[6,9,2], profiles=['offense','balanced','resilient'], n=250;
const results=[];
// Independent gear draws per pair, identical draws/seeds across interventions.
// Both sides of each encounter are played with the same combat seed.
for(const target of targets) for(const profile of profiles) for(const level of [1,10,20]) {
 const modes=['baseline','attack+1',...(target===6?['skill+0.15']:[])];
 for(const mode of modes){
  const attack=B.classAttack[target],power=D.SKILL_POWER[target];
  if(mode==='attack+1')B.classAttack[target]+=1;
  if(mode==='skill+0.15')D.SKILL_POWER[target]+=.15;
  const rows=[];
  for(const opponent of D.ACTIVE_CLASSES.filter(c=>c!==target)){
   const row={opponent,wins:0,draws:0,games:0,duration:0,gear:{}};
   for(let k=0;k<n;k++){
    Math.random=seeded(9132026+target*1000003+opponent*13007+level*11003+k*7919);
    const a=hero(level,target),b=hero(level,opponent);rebuildStats(a,profile);rebuildStats(b,'balanced');
    for(const h of [a,b])for(const it of h.inventory)it.rarity=k%3;
    const seed=(Math.random()*2**32)>>>0;
    for(const side of [0,1]){
     const r=simulate(side?b:a,side?a:b,seed),win=Number(r.winner===side),draw=Number(r.winner<0);
     row.games++;row.wins+=win;row.draws+=draw;row.duration+=r.duration;
     for(const it of a.inventory){const g=row.gear[it.id]??={games:0,wins:0,draws:0};g.games++;g.wins+=win;g.draws+=draw;}
    }
   }
   rows.push(row);
  }
  B.classAttack[target]=attack;D.SKILL_POWER[target]=power;
  results.push({target,profile,level,mode,rows});
 }
 console.log(D.CLASSES[target],profile,level,'done');
}
fs.writeFileSync(new URL('./results.json',import.meta.url),JSON.stringify({version:'0.29.1',seed:9132026,loadoutsPerMatchup:n,opponentProfile:'balanced',rarities:'k modulo 3, same rarity both sides',results}));
