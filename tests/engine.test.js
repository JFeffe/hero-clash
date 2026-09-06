import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
import {D,hero,simulate,applyResult,fighter,energy,grantXP,value} from '../docs/engine.js';
let count=0,kinds=new Set();
for(let a=0;a<13;a++)for(let b=0;b<13;b++)for(const level of [1,10,20]){
 let h=hero(level,a),q=hero(level,b),r=simulate(h,q,100+a*13+b);
 assert.deepEqual(r,simulate(h,q,100+a*13+b),'seeded replay is identical');
 assert(r.duration>0&&r.duration<=30);assert([-1,0,1].includes(r.winner));
 for(const e of r.events){assert(e.time<=30);assert(e.hp.every((hp,i)=>hp>=0&&hp<=r.maxhp[i]));for(const act of e.actions){assert(act.amount>=0);kinds.add(act.kind);}}
 const hearts=h.hearts;applyResult(h,r);assert.equal(h.hearts,hearts-(r.winner===1?1:0));assert.equal(h.wins+h.losses+h.draws,1);count++;
}
const h=hero(),loss={winner:1,duration:30,events:[]};for(let i=0;i<5;i++)applyResult(h,loss);assert.equal(h.hearts,0);assert.equal(h.losses,5);applyResult(h,loss);assert.equal(h.hearts,0);
for(const [winner,mult] of [[0,1],[1,.5],[-1,.75]]){const h=hero();assert.equal(applyResult(h,{winner,duration:30,events:[]}),D.GAINS[0]*mult);}
let p=hero();grantXP(p,730);assert.equal(p.level,20);assert.equal(p.pending.length,19);assert.equal(p.pending.filter(x=>x.type==='item').length,4);p.pending.filter(x=>x.type==='item').forEach(x=>assert.equal(new Set(x.offers.map(it=>it.id)).size,3));
p.energy=10;p.energy_time=Date.now()/1000-120;energy(p);assert(Math.abs(p.energy-12)<.01);p.energy_time=Date.now()/1000-100000;energy(p);assert.equal(p.energy,100);
for(let cls=0;cls<13;cls++)for(let id=0;id<19;id++){const h=hero(20,cls);h.inventory=[{id,level:20}];h.equipped=[-1,-1,-1,-1];h.equipped[D.ITEMS[id].slot]=0;let f=fighter(h);assert(f.maxhp>0&&f.speed>0);assert(Number.isFinite(value(h.inventory[0])));}
for(const kind of ['skill','hit','burn','shield','dodge','heal','wolf','copy','turret','stagger'])assert(kinds.has(kind),kind+' observed');
console.log(`${count} class/level matchups verified; XP, five-loss mortality, equipment and energy checks passed.`);
