import {D,hero,pick,clamp} from './engine.js?v=0.24.0';
export function newArena(h){let classes=D.CLASSES.map((_,i)=>i);return {rerollUsed:false,opponents:[-1,0,1].map(delta=>{const cls=pick(classes);classes=classes.filter(c=>c!==cls);return hero(clamp(h.level+delta,1,20),cls);})};}
export function ensureArena(h){if(!h.arena)h.arena=newArena(h);return h.arena;}
export function rerollArena(h){const arena=ensureArena(h);if(arena.rerollUsed)return false;h.arena=newArena(h);h.arena.rerollUsed=true;return true;}
export function resetArenaAfterBattle(h){if(h.hearts>0)h.arena=newArena(h);else delete h.arena;}
export function acquireItem(h,it){h.inventory.push(it);const slot=D.ITEMS[it.id].slot;h.unseenSlots??=[];if(!h.unseenSlots.includes(slot))h.unseenSlots.push(slot);}
export function markSlotSeen(h,slot){h.unseenSlots=(h.unseenSlots??[]).filter(s=>s!==slot);}
