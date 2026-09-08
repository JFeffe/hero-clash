import {D,randomItem,hero,clamp,simulate,applyResult,battleRewards} from './engine.js?v=0.26.0';
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
// A complete double round-robin provides a feasible continuation after every choice.
export function createPool(h){
 const members=Array.from({length:9},(_,i)=>hero(clamp(h.level+i%3-1,1,20)));
 const ring=[0,...shuffle(Array.from({length:9},(_,i)=>i+1))], rounds=[];
 for(let n=0;n<9;n++){rounds.push(Array.from({length:5},(_,i)=>[ring[i],ring[9-i]]));ring.splice(1,0,ring.pop());}
 return {members,remaining:shuffle([...rounds,...structuredClone(rounds)]),played:0,meetings:Array(9).fill(0),lastRound:[]};
}
export function ensureCareer(h){if(!h.career){h.career={floor:1,history:[],pool:createPool(h)};delete h.arena;}return h.career;}
export function poolChoices(h){const p=ensureCareer(h).pool,ids=[...new Set(p.remaining.map(r=>r.find(pair=>pair.includes(0)).find(i=>i!==0)))];return shuffle(ids).slice(0,3).map(i=>p.members[i-1]);}
function reverse(r){return {...r,winner:r.winner<0?r.winner:1-r.winner,events:r.events.map(e=>({...e,actor:1-e.actor,actions:e.actions.map(a=>({...a,target:1-a.target}))}))};}
function applyCopy(h,o,r){if(h.hearts===0)return;const rewards=battleRewards(h,o);applyResult(h,r,rewards[r.winner===0?'win':r.winner===1?'loss':'draw'].xp);if(!h.hearts){h.ghost=true;return;}for(const p of h.pending){if(p.type==='stat')h.stats[D.MAGIC_CLASSES.includes(h.class)?2:0]++;else if(p.offers?.length){const it=p.offers[0];h.inventory.push(it);h.equipped[D.ITEMS[it.id].slot]=h.inventory.length-1;}}h.pending=[];const reward=rewards[r.winner===0?"win":r.winner===1?"loss":"draw"];if(Math.random()<reward.loot){const it=randomItem(Math.floor(Math.random()*4),h.level,h.class),roll=Math.random();it.rarity=roll<.65?0:roll<.93?1:2;h.inventory.push(it);h.equipped[D.ITEMS[it.id].slot]=h.inventory.length-1;}}
export function resolvePool(h,opponent,result){
 const p=h.career.pool,index=p.members.findIndex(m=>m.id===opponent.id)+1;
 const ri=p.remaining.findIndex(r=>r.some(pair=>pair.includes(0)&&pair.includes(index)));
 if(index===0||ri<0)throw Error('Opponent is not eligible');
 const pairs=p.remaining.splice(ri,1)[0];p.lastRound=[];
 for(const [i,j] of pairs){const a=i===0?h:p.members[i-1],b=j===0?h:p.members[j-1];const r=i===0?result:j===0?reverse(result):simulate(a,b);const aa=structuredClone(a),bb=structuredClone(b);
 if(i!==0)applyCopy(a,bb,r);if(j!==0)applyCopy(b,aa,reverse(r));
 p.lastRound.push({a:a.id,b:b.id,winner:r.winner,ghost:aa.hearts===0||bb.hearts===0});
 }p.meetings[index-1]++;p.played++;
}
export function advanceCareer(h){const c=h.career,p=c.pool;if(p.played<10||h.hearts===0)return null;c.history.push({floor:c.floor,hearts:h.hearts,rounds:10,members:structuredClone(p.members)});if(c.floor===15){h.retired_at=Date.now();return {retired:true,floor:15};}const from=c.floor;c.floor=Math.min(15,c.floor+h.hearts);h.hearts=Math.min(5,h.hearts+1);c.pool=createPool(h);return {from,floor:c.floor,hearts:h.hearts};}
