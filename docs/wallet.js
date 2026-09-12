import {energy,hero} from './engine.js?v=0.29.1';
import {ensureArena,newArena} from './hero-state.js?v=0.29.1';
export const SHOP_PACKS=[{kind:'energy',amount:10},{kind:'energy',amount:20},{kind:'energy',amount:50},{kind:'energy',amount:100},{kind:'reroll',amount:1},{kind:'reroll',amount:3}];
export function validWallet(w){return w&&Number.isFinite(w.energy)&&w.energy>=0&&w.energy<=Number.MAX_SAFE_INTEGER&&Number.isSafeInteger(w.reroll)&&w.reroll>=0;}
export function ensureWallet(g){if(!validWallet(g.wallet))g.wallet={energy:0,reroll:0};return g.wallet;}
export function buyPack(g,index){const pack=SHOP_PACKS[index],w=ensureWallet(g);if(!pack||w[pack.kind]>Number.MAX_SAFE_INTEGER-pack.amount)return false;w[pack.kind]+=pack.amount;return true;}
export function useEnergy(g,h,requested){const w=ensureWallet(g);if(!g.heroes.includes(h)||h.hearts<=0||!Number.isFinite(requested)||requested<=0)return 0;energy(h);const amount=Math.min(requested,w.energy,Math.max(0,100-h.energy));if(amount<=0)return 0;h.energy+=amount;w.energy=Math.max(0,w.energy-amount);return amount;}
export function spendArenaReroll(g,h){if(!g.heroes.includes(h)||h.hearts<=0)return false;const w=ensureWallet(g),arena=ensureArena(h),cost=arena.rerollUsed?1:0;if(w.reroll<cost)return false;h.arena=newArena(h);h.arena.rerollUsed=true;w.reroll-=cost;return true;}
export function spendRecruitReroll(g){const w=ensureWallet(g);if(w.reroll<1||g.heroes.length>=5)return null;const h=hero();w.reroll--;return h;}
