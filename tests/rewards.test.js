import {ensureCareer} from '../docs/career.js';
import assert from 'node:assert/strict';
import {hero,battleRewards,GIVEN_NAMES,FAMILY_NAMES,D} from '../docs/engine.js';
import {settle as realSettle} from '../docs/progression.js';
for(let level=1;level<=20;level++)for(let delta=-1;delta<=1;delta++)for(const winner of [0,1,-1]){
 const h=hero(level),opponent=hero(Math.max(1,Math.min(20,level+delta))),quote=battleRewards(h,opponent),key=winner===0?'win':winner===1?'loss':'draw';const previousXP=h.xp,game={heroes:[h],graveyard:[]};
 const result=settle(game,h,{winner,events:[],duration:30},opponent,()=>.999);
 assert.equal(result.amount,quote[key].xp);assert(Math.abs(h.xp-previousXP-quote[key].xp)<1e-8);assert.equal(h.energy,80);assert.equal(result.loot,null);
}
const h=hero(5),low=battleRewards(h,hero(4)),same=battleRewards(h,hero(5)),high=battleRewards(h,hero(6));
for(const key of ['win','loss','draw']){assert(low[key].xp<same[key].xp&&same[key].xp<high[key].xp);assert(low[key].loot<same[key].loot&&same[key].loot<high[key].loot);}
assert(high.loss.xp<same.win.xp,'losing deliberately should not beat a same-level win in XP');
for(const delta of [-1,0,1])for(const winner of [0,1,-1]){
 let h=hero(5),opponent=hero(5+delta),quote=battleRewards(h,opponent),chance=quote[winner===0?'win':winner===1?'loss':'draw'].loot;
 let values=[chance-1e-6,0,0],g={heroes:[h],graveyard:[]};assert(settle(g,h,{winner,events:[],duration:30},opponent,()=>values.shift()).loot);
 h=hero(5);g={heroes:[h],graveyard:[]};assert.equal(settle(g,h,{winner,events:[],duration:30},opponent,()=>chance).loot,null);
}
assert.equal(new Set(GIVEN_NAMES).size,GIVEN_NAMES.length);assert.equal(new Set(FAMILY_NAMES).size,FAMILY_NAMES.length);assert(GIVEN_NAMES.length*FAMILY_NAMES.length>2000);const n=hero();assert(n.name.includes(' '));assert.equal(n.xp,0);assert.deepEqual(n.stats,D.BASE[n.class]);
console.log(`180 reward settlements match pre-fight previews; loot thresholds verified; ${GIVEN_NAMES.length*FAMILY_NAMES.length} name combinations.`);

function settle(game,h,r,o,rng){if(game.heroes.includes(h)){ensureCareer(h).pool.members[0]=o;}return realSettle(game,h,r,o,rng);}
