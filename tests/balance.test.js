import assert from 'node:assert/strict';
import {D,fighter,simulate,value} from '../docs/engine.js';
// A fair directed counter graph: exactly two strengths and two weaknesses each.
for(const c of D.ACTIVE_CLASSES){
 assert.equal(new Set(D.ADVANTAGES[c]).size,2);
 assert.equal(D.ADVANTAGES.filter(row=>row.includes(c)).length,2);
 for(const target of D.ADVANTAGES[c]){assert.notEqual(target,c);assert(!D.ADVANTAGES[target].includes(c));}
}
function hero(cls,endurance,rarity=0){return {class:cls,level:20,name:'Regression',stats:[...D.BASE[cls]].map((n,i)=>i===3?endurance:n),inventory:[{id:14,level:20,rarity}],equipped:[-1,-1,0,-1]};}
for(const cls of D.ACTIVE_CLASSES)for(let tier=0;tier<3;tier++){
 const light=hero(cls,3,tier),tank=hero(cls,25,tier),enemy=hero(9,20);enemy.equipped=[-1,-1,-1,-1];
 const saved=JSON.stringify([light,tank]);
 const results=[simulate(light,enemy,61891),simulate(tank,enemy,61891)];
 const maximum=results.map(r=>Math.max(...r.events.flatMap(e=>e.actions.filter(a=>a.kind==='fairy'&&a.target===0).map(a=>a.amount))));
 assert(Math.abs(maximum[0]-value(light.inventory[0]))<1e-8);
 assert(Math.abs(maximum[1]-maximum[0])<1e-8,'Extra Endurance must not amplify Fairy healing');
 for(const r of results)for(const e of r.events)e.hp.forEach((hp,i)=>assert(hp>=0&&hp<=r.maxhp[i]+1e-8));
 assert.equal(JSON.stringify([light,tank]),saved,'Simulation must not modify saved heroes');
 assert.deepEqual(simulate(tank,enemy,61891),results[1],'Seeded replays must reproduce the duel');
 const f=fighter(light);assert(7+f.classAttack+f.stats[D.MAGIC_CLASSES.includes(cls)?2:0]*1.45>0);
}
console.log('Counter graph, fixed Fairy healing across classes/rarities/Endurance, HP bounds, save preservation and replay determinism verified.');
