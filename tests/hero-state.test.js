import assert from 'node:assert/strict';
import {hero} from '../docs/engine.js';
import {ensureArena,rerollArena,acquireItem,markSlotSeen} from '../docs/hero-state.js';
import {settle,migrate} from '../docs/progression.js';
const a=hero(5),b=hero(8);const arena=structuredClone(ensureArena(a));
for(let i=0;i<5;i++){ensureArena(b);assert.deepEqual(ensureArena(a),arena);}
assert.equal(new Set(arena.opponents.map(o=>o.id)).size,3);
assert(arena.opponents.every(o=>[4,5,6].includes(o.level)));
let saved=JSON.parse(JSON.stringify({version:2,heroes:[a,b],graveyard:[]}));migrate(saved);assert.deepEqual(ensureArena(saved.heroes[0]),arena);
assert(rerollArena(a));const rerolled=structuredClone(a.arena);assert.notDeepEqual(rerolled.opponents,arena.opponents);assert.equal(rerollArena(a),false);assert.deepEqual(a.arena,rerolled);assert.equal(b.arena.rerollUsed,false);
const reloaded=JSON.parse(JSON.stringify(a));assert.equal(rerollArena(reloaded),false);assert.deepEqual(reloaded.arena,rerolled);
for(const winner of [0,1,-1]){let h=hero(1);ensureArena(h);rerollArena(h);let previous=structuredClone(h.arena);let g={heroes:[h],graveyard:[]};settle(g,h,{winner,duration:30,events:[]},h.arena.opponents[1],()=>.99);assert.equal(h.arena.rerollUsed,false);assert.notDeepEqual(h.arena.opponents,previous.opponents);assert(h.arena.opponents.every(o=>h.career.pool.members.some(m=>m.id===o.id)));const after=structuredClone(h.arena);migrate(g);assert.deepEqual(h.arena,after);}
const dead=hero();dead.hearts=1;ensureArena(dead);settle({heroes:[dead],graveyard:[]},dead,{winner:1,duration:30,events:[]},dead.arena.opponents[1],()=>.99);assert.equal(dead.arena,undefined);
const h=hero(1,0);acquireItem(h,{id:0,level:2});acquireItem(h,{id:4,level:2});acquireItem(h,{id:10,level:2});assert.deepEqual(h.unseenSlots,[0,2]);let restored=JSON.parse(JSON.stringify(h));markSlotSeen(restored,0);assert.deepEqual(restored.unseenSlots,[2]);assert.deepEqual(h.unseenSlots,[0,2]);markSlotSeen(restored,2);assert.deepEqual(restored.unseenSlots,[]);acquireItem(restored,{id:10,level:3});assert.deepEqual(restored.unseenSlots,[2]);
const old={heroes:[hero()],graveyard:[]};migrate(old);assert.deepEqual(old.heroes[0].unseenSlots,[]);assert.equal(old.heroes[0].arena,undefined);
console.log('Opponent persistence, reload, per-hero reroll cap, all-outcome reset, migration and per-slot notifications verified.');
