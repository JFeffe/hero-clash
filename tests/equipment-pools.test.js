import test from 'node:test';
import assert from 'node:assert/strict';
import {D,hero,fighter,simulate,randomItem,grantXP,equipmentPool,canEquip,equipItem,loadRuleset,RULESET} from '../docs/engine.js';
import {acquireItem} from '../docs/hero-state.js';
import {createPool} from '../docs/career.js';

test('Nine active classes, four common equipped slots, compatible recruitment, opponents and rewards',()=>{
 assert.equal(D.ACTIVE_CLASSES.length,9);
 assert.deepEqual([0,1,2,3].map(s=>D.ITEMS.filter(x=>x.slot===s).length),[15,8,6,6]);
 for(const cls of [5,10,11,12])assert.throws(()=>hero(1,cls),/Inactive/);
 for(const cls of D.ACTIVE_CLASSES){
  const h=hero(1,cls);assert.deepEqual(h.equipped,[0,1,2,3]);assert(h.inventory.every(it=>it.rarity===0&&canEquip(cls,it.id)));
  for(let n=0;n<50;n++)for(let slot=0;slot<4;slot++)assert(equipmentPool(cls,slot).includes(randomItem(slot,20,cls).id));
  grantXP(h,D.XP.at(-1));for(const reward of h.pending.filter(p=>p.type==='item')){assert.equal(new Set(reward.offers.map(it=>it.id)).size,3);assert(reward.offers.every(it=>canEquip(cls,it.id)));}
  for(const bot of createPool(h).members){assert(D.ACTIVE_CLASSES.includes(bot.class));assert(bot.inventory.every(it=>canEquip(bot.class,it.id)));}
 }
});
test('Exact weapon restrictions and safe equip/acquisition boundaries',()=>{
 assert.deepEqual(equipmentPool(1,0),[2,19,20]);assert(!canEquip(1,4));assert(!canEquip(1,1));
 assert(canEquip(8,27));assert(canEquip(6,25));assert(canEquip(4,3));assert.deepEqual(equipmentPool(4,0),[0,5,3]);
 const h=hero(1,1),before=structuredClone(h);assert.equal(acquireItem(h,{id:1,level:1}),false);assert.deepEqual(h,before);
 h.inventory.push({id:1,level:1});assert.equal(equipItem(h,0,4),false);assert.equal(equipItem(h,0,1),false);assert.equal(equipItem(h,8,0),false);assert.equal(equipItem(h,0,999),false);assert.equal(equipItem(h,0,-1),true);
});
test('Range and damage stat belong to class, even with the identical staff',()=>{
 const mage=hero(1,2),paladin=hero(1,4);for(const h of [mage,paladin]){h.inventory=[{id:3,level:1}];h.equipped=[0,-1,-1,-1];}
 assert(fighter(mage).ranged);assert(!fighter(paladin).ranged);assert.equal(fighter(mage).magic,fighter(paladin).magic);
 assert(D.MAGIC_CLASSES.includes(4));assert(D.MAGIC_CLASSES.includes(7));assert(!D.MAGIC_CLASSES.includes(8));assert(fighter(hero(1,8)).ranged);
});
test('Secondary Strength and Intelligence each improve the appropriate resistance on every class',()=>{
 for(const cls of D.ACTIVE_CLASSES){const h=hero(1,cls);h.equipped=[-1,-1,-1,-1];const f=fighter(h);h.stats[0]++;assert(Math.abs(fighter(h).defense-f.defense-.8)<1e-9);h.stats[2]++;assert(Math.abs(fighter(h).magicDefense-f.magicDefense-.8)<1e-9);}
});
test('Every new model and rarity can fight; burns and bleeding stay bounded and replays are deterministic',()=>{
 const kinds=new Set();for(let id=19;id<D.ITEMS.length;id++)for(let rarity=0;rarity<3;rarity++){
  const cls=D.ACTIVE_CLASSES.find(c=>canEquip(c,id)),a=hero(20,cls),b=hero(20,4);a.inventory=[{id,level:20,rarity}];a.equipped=[-1,-1,-1,-1];a.equipped[D.ITEMS[id].slot]=0;
  const copy=structuredClone([a,b]),r=simulate(a,b,719+id);assert.deepEqual(simulate(a,b,719+id),r);assert.deepEqual([a,b],copy);
  for(const e of r.events){assert(e.hp.every(Number.isFinite));assert(e.shield.every(n=>n>=0));assert(e.burn.every(n=>n>=0&&n<=2));assert((e.bleed??[]).every(n=>n>=0&&n<=2));e.actions.forEach(a=>kinds.add(a.kind));}
 }
 assert(kinds.has('burn'));assert(kinds.has('bleed'));
});
test('New ruleset resets old progression once and preserves current saves on reload',()=>{
 const old={version:2,lang:'fr',heroes:[hero()],wallet:{energy:200},lastBattle:{}};const saved=loadRuleset(old);assert.equal(saved.ruleset,RULESET);assert.equal(saved.lang,'fr');assert.deepEqual(saved.heroes,[]);assert.equal(saved.lastBattle,null);assert.equal(saved.wallet,undefined);assert.equal(old.heroes.length,1);
 saved.heroes.push(hero());assert.equal(loadRuleset(saved),saved);
});
test('Paladin shields absorb periodic burn, wolf bites and engineer turret fire',()=>{
 const absorbed=new Set();
 for(const cls of [2,8])for(let seed=1;seed<=20;seed++){
  const a=hero(1,cls),b=hero(1,4);a.stats=[6,5,6,80,0];b.stats=[0,3,0,100,0];a.inventory=[{id:cls===2?21:1,level:1},{id:10,level:1}];a.equipped=[0,-1,1,-1];b.inventory=[];b.equipped=[-1,-1,-1,-1];
  const r=simulate(a,b,seed);for(const e of r.events)for(const act of e.actions)if(act.target===1&&act.amount===0&&['burn','wolf','turret'].includes(act.kind))absorbed.add(act.kind);
 }
 assert.deepEqual([...absorbed].sort(),['burn','turret','wolf']);
});
