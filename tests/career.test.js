import assert from 'node:assert/strict';
import {hero,energy} from '../docs/engine.js';
import {ensureArena,rerollArena} from '../docs/hero-state.js';
import {ensureCareer} from '../docs/career.js';
import {settle,migrate} from '../docs/progression.js';
const result=winner=>({winner,events:[],duration:30});
for(let trial=0;trial<15;trial++){
 const h=hero(),g={heroes:[h],graveyard:[]};ensureArena(h);const p=h.career.pool;
 const ghost=p.members[0];ghost.hearts=0;ghost.ghost=true;const frozen=structuredClone(ghost);
 for(let n=0;n<10;n++){
  h.energy=100;h.pending=[];const before=h.energy_time;
  const options=ensureArena(h).opponents;assert(options.length>=1&&options.length<=3);
  const o=options[trial%options.length];const out=settle(g,h,result(0),o,()=>.999);
  assert.equal(h.energy,80);assert.equal(h.energy_time,before);assert.equal(p.played,n+1);
  assert.equal(new Set(p.lastRound.flatMap(r=>[r.a,r.b])).size,10);
  assert(p.meetings.every(x=>x<=2));assert.deepEqual(ghost,frozen);
  if(n===9){assert.equal(h.career.floor,6);assert.equal(h.hearts,5);assert.equal(out.transition.floor,6);}
 }
}
const h=hero(),g={heroes:[h],graveyard:[]};ensureArena(h);h.career.floor=13;h.hearts=4;
for(let n=0;n<20;n++){h.energy=100;h.pending=[];settle(g,h,result(0),ensureArena(h).opponents[0],()=>.999);if(n===9){assert.equal(h.career.floor,15);assert.equal(g.heroes.length,1);assert.equal(h.career.pool.played,0);}}
assert.equal(g.temple.length,1);assert.equal(g.heroes.length,0);assert.equal(h.career.pool.played,10);assert(h.retired_at);assert.throws(()=>settle(g,h,result(0),hero()));
const dying=hero(),gd={heroes:[dying],graveyard:[]};dying.hearts=1;ensureArena(dying);settle(gd,dying,result(1),dying.arena.opponents[0],()=>.999);assert.equal(gd.graveyard[0],dying);assert.equal(dying.career.pool.played,1);
const old=hero();old.hearts=2;old.energy=47;old.wins=7;old.arena={rerollUsed:false,opponents:[hero(),hero(),hero()]};migrate({heroes:[old],graveyard:[]});ensureArena(old);assert.equal(old.hearts,2);assert.equal(old.energy,47);assert.equal(old.wins,7);assert.equal(old.career.floor,1);
const save=JSON.parse(JSON.stringify(old));assert.deepEqual(ensureArena(save),old.arena);const pool=structuredClone(save.career.pool);rerollArena(save);assert.deepEqual(save.career.pool,pool);
save.energy=19;const before=structuredClone(save);assert.throws(()=>settle({heroes:[save],graveyard:[]},save,result(0),save.arena.opponents[0]));assert.deepEqual(save,before);
save.energy=0;save.energy_time=Date.now()/1000-60;energy(save);assert(save.energy>=1&&save.energy<1.1);
console.log('Pools, scheduling, ghosts, progression, retirement, death, migration and unchanged energy verified.');
