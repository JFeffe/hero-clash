import {D,canEquip,hero,pick,clamp} from './engine.js?v=0.29.1';
import {ensureCareer,poolChoices} from './career.js?v=0.29.1';
export function newArena(h){return {rerollUsed:false,opponents:poolChoices(h)};}
export function ensureArena(h){ensureCareer(h);if(!h.arena)h.arena=newArena(h);return h.arena;}
export function rerollArena(h){const arena=ensureArena(h);if(arena.rerollUsed)return false;h.arena=newArena(h);h.arena.rerollUsed=true;return true;}
export function resetArenaAfterBattle(h){if(h.hearts>0&&!h.retired_at)h.arena=newArena(h);else delete h.arena;}
export function acquireItem(h,it){if(!it||!canEquip(h.class,it.id))return false;h.inventory.push(it);const slot=D.ITEMS[it.id].slot;h.unseenSlots??=[];if(!h.unseenSlots.includes(slot))h.unseenSlots.push(slot);}
export function markSlotSeen(h,slot){h.unseenSlots=(h.unseenSlots??[]).filter(s=>s!==slot);}
