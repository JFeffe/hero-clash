import test from 'node:test';
import assert from 'node:assert/strict';
import {D,fighter,simulate,value} from '../docs/engine.js';
const make=(cls,end=10)=>({class:cls,level:20,name:'Balance regression',stats:[...D.BASE[cls]].map((v,i)=>i===3?end:v),inventory:[],equipped:[-1,-1,-1,-1]});
test('Monk healing preserves low HP and slows above 250, without overhealing',()=>{
 for(const end of [5,10,20,30]){
  const h=make(7,end),o=make(0,100);o.stats[0]=35;
  const max=fighter(h).maxhp,limit=.05*Math.min(max,250)+.025*Math.max(0,max-250);
  let heals=[];
  for(let seed=1;seed<=30;seed++){
   const r=simulate(h,o,seed);
   heals.push(...r.events.flatMap(e=>e.actions.filter(a=>a.kind==='heal'&&a.target===0).map(a=>a.amount)));
   for(const e of r.events)assert(e.hp[0]<=max);
  }
  assert(heals.length);assert(heals.every(n=>n<=limit+1e-8));
  assert(Math.abs(Math.max(...heals)-limit)<1e-8);
 }
});
test('Mage weapon and skill burns gain only the partial synergy, with bounded refreshes',()=>{
 const h=make(2,100),o=make(0,100);
 h.inventory=[{id:21,level:20,rarity:2}];h.equipped=[0,-1,-1,-1];
 const power=value(h.inventory[0]),cap=Math.max(power,4)+.25*Math.min(power,4);
 const expected=cap*100/(100+fighter(o).magicDefense*3);
 let burns=[];
 for(let seed=1;seed<=30;seed++)burns.push(...simulate(h,o,seed).events.flatMap(e=>e.actions.filter(a=>a.kind==='burn'&&a.target===1).map(a=>a.amount)));
 assert(burns.length);assert(burns.every(v=>v<=expected+1e-8));
 assert(Math.abs(Math.max(...burns)-expected)<1e-8);
});
test('Dog remains available to Mage and increases magical damage without mutating heroes',()=>{
 const h=make(2,100),o=make(0,100),dog=structuredClone(h);
 dog.inventory=[{id:11,level:20,rarity:2}];dog.equipped=[-1,-1,0,-1];
 const before=JSON.stringify([dog,o]);let plain=0,boosted=0;
 for(let seed=1;seed<=30;seed++){
  const hit=r=>r.events.flatMap(e=>e.actions).find(a=>a.kind==='hit'&&a.target===1).amount;
  plain+=hit(simulate(h,o,seed));boosted+=hit(simulate(dog,o,seed));
 }
 assert(boosted>plain);assert.equal(JSON.stringify([dog,o]),before);
});
