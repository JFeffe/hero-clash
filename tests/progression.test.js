import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
import {hero,fighter,value,D} from '../docs/engine.js';
import {migrate,settle,legacyPoints,rollLoot} from '../docs/progression.js';
const a=hero(),b=hero(),game={heroes:[a],graveyard:[],selected:a.id};
a.hearts=1;a.wins=4;a.level=3;a.xp=2;
let outcome=settle(game,a,{winner:1,events:[],duration:30},b,()=>0);
assert.equal(a.hearts,0);assert.equal(outcome.loot,null);assert.equal(outcome.points,legacyPoints(a));assert.equal(game.company_points,36);assert.equal(game.heroes.length,0);assert.equal(game.graveyard.length,1);
assert.throws(()=>settle(game,a,{winner:1,events:[],duration:30},b));
for(let i=0;i<5;i++)migrate(game);assert.equal(game.company_points,36);
const old=structuredClone(game);delete old.graveyard[0].company_points;delete old.company_points;migrate(old);assert.equal(old.company_points,36);assert.deepEqual(migrate(structuredClone(old)),old);
const fresh=hero();assert.equal(fresh.level,1);assert.equal(fresh.xp,0);assert.equal(fresh.hearts,5);assert.deepEqual(fresh.stats,D.BASE[fresh.class]);assert(fresh.inventory.every(it=>!it.rarity));
for(const [winner,chance] of [[0,.4],[1,.2],[-1,.3]]){assert.equal(rollLoot(fresh,winner,()=>chance),null);for(const [r,tier] of [[.1,0],[.8,1],[.99,2]]){let seq=[0,0,r];let it=rollLoot(fresh,winner,()=>seq.shift());assert.equal(it.rarity,tier);}}
let h=hero();h.inventory=[{id:0,level:1}];h.equipped=[0,-1,-1,-1];const common=fighter(h);h.inventory[0].rarity=2;let rare=fighter(h);assert(Math.abs(value(h.inventory[0])-D.ITEMS[0].base*1.5)<1e-10);assert(rare.physical>common.physical);assert.equal(rare.accuracy,common.accuracy);assert.equal(rare.speed,common.speed);
const live=hero(),g={heroes:[live],graveyard:[]};let seq=[0,0,.99];let res=settle(g,live,{winner:0,events:[],duration:30},b,()=>seq.shift());assert.equal(res.points,0);assert.equal(g.company_points,0);assert.equal(live.inventory.at(-1),res.loot);assert.equal(res.loot.rarity,2);
console.log('Death credit, migration without double counting, fresh recruits, loot thresholds, rare effects and inventory awards verified.');
