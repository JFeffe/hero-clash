import {ensureWallet} from './wallet.js?v=0.29.0';
import {ensureCareer,resolvePool,advanceCareer,markBot} from './career.js?v=0.29.0';
import {acquireItem,resetArenaAfterBattle} from './hero-state.js?v=0.29.0';
import {D,randomItem,applyResult,battleRewards} from './engine.js?v=0.29.0';
export const rarity=it=>Number.isInteger(it.rarity)?Math.max(0,Math.min(2,it.rarity)):0;
export const legacyPoints=h=>10+3*Math.max(0,h.level-1)+5*h.wins+h.draws;
// The ledger is reconstructed from career records, never incremented during viewing/replay.
export function migrate(game){
 // All opponents in this local prototype are generated bots, including legacy saves.
 for(const h of [...game.heroes,...game.graveyard,...(game.temple??[])]){
  for(const o of h.career?.pool?.members??[])markBot(o);
  for(const entry of h.career?.history??[])for(const o of entry.members??[])markBot(o);
  for(const o of h.arena?.opponents??[])markBot(o);
  if(h.final_opponent&&!h.final_opponent.startsWith('[BOT] '))h.final_opponent='[BOT] '+h.final_opponent;
 }
 if(game.lastBattle?.heroes?.[1]&&!game.lastBattle.preview)markBot(game.lastBattle.heroes[1]);
for(const h of game.graveyard)if(!Number.isFinite(h.company_points))h.company_points=legacyPoints(h);game.company_points=game.graveyard.reduce((n,h)=>n+h.company_points,0);for(const h of game.heroes)h.unseenSlots??=[];game.temple??=[];ensureWallet(game);game.revision=7;return game;}
export function rollLoot(h,winner,rng=Math.random,chance=null){if(h.hearts<=0||rng()>=(chance??(winner===0?.4:winner===1?.2:.3)))return null;const it=randomItem(Math.floor(rng()*4),h.level,h.class);const roll=rng();it.rarity=roll<.65?0:roll<.93?1:2;return it;}
export function settle(game,h,result,opponent,rng=Math.random){if(!game.heroes.includes(h)||h.hearts<=0)throw Error('Hero is not active');if(h.energy<20)throw Error('Insufficient energy');ensureCareer(h);if(!h.career.pool.members.some(o=>o.id===opponent.id))throw Error('Opponent is not in pool');opponent=structuredClone(opponent);resolvePool(h,opponent,result);const quote=battleRewards(h,opponent),reward=quote[result.winner===0?'win':result.winner===1?'loss':'draw'];h.energy-=20;const amount=applyResult(h,result,reward.xp);let loot=rollLoot(h,result.winner,rng,reward.loot),points=0;if(loot)acquireItem(h,loot);if(h.hearts===0){h.died_at=Date.now();h.final_opponent=opponent.name;h.company_points=legacyPoints(h);points=h.company_points;game.graveyard.push(h);game.heroes=game.heroes.filter(x=>x.id!==h.id);game.selected=game.heroes[0]?.id??null;game.deathNotice=h.id;}const transition=advanceCareer(h);if(transition?.retired){game.temple??=[];game.temple.push(h);game.heroes=game.heroes.filter(x=>x.id!==h.id);game.selected=game.heroes[0]?.id??null;}resetArenaAfterBattle(h);migrate(game);return {amount,loot,points,transition};}
