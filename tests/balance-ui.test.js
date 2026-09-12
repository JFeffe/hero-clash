import * as bastion from '../docs/bastion.js';
import * as wallet from '../docs/wallet.js';
// Render production templates with a minimal DOM host; this is not device/visual QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import * as appearance from '../docs/appearance.js';
import * as career from '../docs/career.js';
import * as engine from '../docs/engine.js';
import * as progression from '../docs/progression.js';
import * as heroState from '../docs/hero-state.js';
import * as art from '../docs/art.js';
import {BALANCE as B} from '../docs/balance.js';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const h=engine.hero(1,4);h.inventory=[{id:14,level:1,rarity:0}];h.equipped=[-1,-1,0,-1];
const backup={version:2,ruleset:engine.RULESET,revision:5,lang:'en',heroes:[h],graveyard:[],selected:h.id};
const host={innerHTML:'',style:{},setAttribute(){}};
const context=vm.createContext({...bastion,...wallet,...career,...appearance,...engine,...progression,...heroState,...art,B,console,structuredClone,performance,crypto:webcrypto,
 localStorage:{getItem:()=>JSON.stringify(backup),setItem:()=>{}},
 document:{body:{dataset:{}},querySelector:()=>host,querySelectorAll:()=>[],documentElement:{},addEventListener:()=>{}},
 window:{matchMedia:()=>({matches:false}),addEventListener:()=>{},scrollTo:()=>{}},
 cancelAnimationFrame:()=>{},requestAnimationFrame:()=>0,setInterval:()=>{},setTimeout:()=>0,clearTimeout:()=>{}});
vm.runInContext(fs.readFileSync('docs/app.js','utf8').replace(/^import .*;\n/gm,''),context);
assert(host.innerHTML.includes(JSON.parse(fs.readFileSync('package.json','utf8')).version));
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}'`,context);
 const html=vm.runInContext('fullHeroSheet(selected())',context);
 assert(!/NaN|undefined/.test(html));
 const f=engine.fighter(h),expected=((7+f.classAttack+h.stats[2]*1.45)*f.magic).toFixed(1);
 assert(html.includes(expected));assert(html.includes('1.90'));
 const settings=vm.runInContext('options()',context);assert(settings.includes(lang==='en'?'fixed amount of HP':'nombre fixe de PV'));
 assert(!settings.includes('rare: +5% speed'));assert(!settings.includes('rare : vitesse +5 %'));
 const classes=vm.runInContext('classes()',context);assert(classes.includes(lang==='en'?'Weak against':'Désavantage contre'));
 for(let id=0;id<engine.D.ITEMS.length;id++)for(let tier=0;tier<3;tier++){
 const text=vm.runInContext(`itemText({id:${id},level:20,rarity:${tier}})`,context);
 assert(!/NaN|undefined/.test(text));
 }
}
console.log('French/English balance templates, displayed equipped damage, fixed Fairy healing, all item descriptions and current ruleset save loading verified.');

const careerBefore=vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context);
vm.runInContext('startArtDemo()',context);
assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context),careerBefore);
assert.equal(vm.runInContext('battle.preview',context),true);
assert(vm.runInContext('battle.result.events.some(e=>e.actions.some(a=>a.kind==="wolf"))',context));
vm.runInContext('playLast(battle)',context);
assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context),careerBefore);
assert.equal(vm.runInContext('battle.index',context),0);
console.log('Showcase and replay leave company state, hearts, XP, energy and saved battle unchanged.');

vm.runInContext("startArtDemo('mage')",context);
assert.equal(vm.runInContext('battle.heroes[0].class',context),2);
assert(vm.runInContext('battle.result.events.some(e=>e.actions.some(a=>a.kind==="ignite"))',context));
assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context),careerBefore);
context.window.scrollY=543;let scrollCalls=[],focusOptions;
context.window.scrollTo=(x,y)=>scrollCalls.push([x,y]);host.focus=options=>{focusOptions=options;};
vm.runInContext("page='detail';render({preserveScroll:true,focusSlot:2})",context);
assert.deepEqual(scrollCalls.at(-1),[0,543]);assert.equal(focusOptions.preventScroll,true);
vm.runInContext("go('home')",context);assert.deepEqual(scrollCalls.at(-1),[0,0]);
console.log('Mage showcase, preserved scroll/focus and normal navigation verified.');

// Every modernized class and familiar can be demonstrated without settlement.
for(const cls of engine.D.ACTIVE_CLASSES)for(const petId of [-1,10,11,12,13,14]){
 vm.runInContext(`startArtDemo(${cls},${petId})`,context);
 assert.equal(vm.runInContext('battle.heroes[0].class',context),cls);
 assert.equal(vm.runInContext('battle.heroes[0].inventory[battle.heroes[0].equipped[2]]?.id??-1',context),petId);
 assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context),careerBefore);
 assert(vm.runInContext('battle.result.events.length>0',context));
}
console.log('All active class/familiar showcases preserve the company save.');

for(const lang of ['fr','en']){vm.runInContext(`game.lang='${lang}';go('opponents')`,context);assert(host.innerHTML.includes('/ 15'));assert(!/NaN|undefined/.test(host.innerHTML));assert(vm.runInContext('validSave(JSON.parse(JSON.stringify(game)))',context));}
vm.runInContext('startFight(0)',context);assert.equal(vm.runInContext('selected().career.pool.played',context),1);
const savedCareer=vm.runInContext("JSON.stringify(game,(k,v)=>['energy','energy_time'].includes(k)?undefined:v)",context);vm.runInContext('playLast()',context);assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>['energy','energy_time'].includes(k)?undefined:v)",context),savedCareer);
vm.runInContext('game=JSON.parse(JSON.stringify(game));migrate(game);go("opponents")',context);assert(vm.runInContext('validSave(game)',context));
vm.runInContext('go("temple")',context);assert(!/NaN|undefined/.test(host.innerHTML));
console.log('Career arena FR/EN, real settlement, replay, reload, import and Temple templates verified.');

for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}';go('pool')`,context);
 assert.equal((host.innerHTML.match(/<details class="panel">/g)||[]).length,10);
 assert(!/NaN|undefined/.test(host.innerHTML));
 assert(vm.runInContext('selected().career.pool.members.every(o=>poolPage().includes(o.name))',context));
}
vm.runInContext('game.heroes.push(hero());game.selected=game.heroes[1].id;go("pool")',context);
assert.equal(vm.runInContext('selected().career.pool.played',context),0);
let preReset=vm.runInContext('JSON.stringify(game)',context);
context.confirm=()=>false;vm.runInContext('resetAccount()',context);assert.equal(vm.runInContext('JSON.stringify(game)',context),preReset);
context.confirm=()=>true;context.localStorage.setItem=()=>{throw Error('Storage full');};
vm.runInContext('resetAccount()',context);assert.equal(vm.runInContext('JSON.stringify(game)',context),preReset);
let persisted;context.localStorage.setItem=(key,value)=>{persisted=JSON.parse(value);};
vm.runInContext('resetAccount()',context);
assert.equal(persisted.heroes.length,0);assert.equal(persisted.graveyard.length,0);assert.equal(persisted.temple.length,0);assert.equal(persisted.company_points,0);assert.equal(persisted.lastBattle,null);assert.equal(persisted.selected,null);
assert.equal(vm.runInContext('page',context),'home');assert.equal(vm.runInContext('battle',context),null);
console.log('Ten-member pool, selected hero, reset cancellation, storage failure rollback and persisted fresh start verified.');
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}'`,context);
 const main=vm.runInContext('home()',context),settings=vm.runInContext('options()',context);
 assert(!main.includes('id="demo-class"'));assert(!main.includes('warrior-preview.html'));
 const tools=settings.slice(settings.indexOf(lang==='fr'?'Outils de prototype':'Prototype tools'));
 assert(tools.includes('id="demo-class"'));assert(tools.includes('warrior-preview.html'));assert(tools.includes('data-action="reset-account"'));
 assert.equal((settings.match(/data-action="reset-account"/g)||[]).length,1);
}
console.log('Demo, equipment preview and reset grouped under Prototype tools in FR/EN.');

// Compact company progression stays hero-specific, and Temple sheets are read-only.
vm.runInContext("game.heroes=[hero(2,0),hero(3,2)];game.selected=game.heroes[0].id;ensureCareer(game.heroes[0]).floor=6;ensureCareer(game.heroes[1]).floor=11;game.heroes[0].wins=4;game.heroes[0].losses=2;game.heroes[0].draws=1;game.heroes[0].career.pool.played=7;page='home'",context);
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}'`,context);
 const html=vm.runInContext('companyCard(selected())',context);
 assert(html.includes('4 / 2 / 1'));assert(html.includes('7 / 10'));assert(html.includes('6/15'));
 const banner=vm.runInContext('sceneBanner()',context);assert(banner.includes(vm.runInContext('selected().name',context)));assert(banner.includes('scene-middle'));
 vm.runInContext('game.temple=[structuredClone(game.heroes[1])];game.temple[0].retired_at=Date.now();game.temple[0].career.floor=15;memorialId=game.temple[0].id',context);
 const before=vm.runInContext('JSON.stringify(game.temple)',context);
 assert(vm.runInContext('temple()',context).includes('data-action="champion"'));
 assert(vm.runInContext('temple()',context).includes('data-portrait'));
 const sheet=vm.runInContext('champion()',context);assert(sheet.includes('data-page="temple"'));assert(!sheet.includes('data-equip='));
 assert.equal(vm.runInContext('JSON.stringify(game.temple)',context),before);
 const store=vm.runInContext('shop()',context);assert.equal((store.match(/data-action="buy-pack"/g)||[]).length,6);assert.equal((store.match(/data-action="shop-page"/g)||[]).length,6);
}
console.log('Grouped per-hero progress, selected-hero banner, read-only champion cards/sheets and all six shop packs verified.');

// Reward decisions stay before the complete, read-only reference on both languages.
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}';selected().pending=[{type:'stat',level:3}]`,context);
 const statReward=vm.runInContext('rewards()',context);
 assert.equal((statReward.match(/data-action="reward"/g)||[]).length,5);
 assert(statReward.indexOf('reward-options')<statReward.indexOf('reward-reference'));
 assert(statReward.includes('combat-stats')&&statReward.includes('loadout'));
 vm.runInContext("selected().pending=[{type:'item',level:5,offers:[{id:0,level:5,rarity:0},{id:14,level:5,rarity:2},{id:9,level:5,rarity:1}]}]",context);
 const itemReward=vm.runInContext('rewards()',context);
 assert.equal((itemReward.match(/data-action="reward"/g)||[]).length,4);
 assert(itemReward.includes('data-index="-1"'));
}
console.log('Compact reward templates retain all five stat choices, item choices, skip and full reference in FR/EN.');

host.focus=()=>{};
vm.runInContext("page='home';game.selected=game.heroes[0].id;actions['company-select']({dataset:{id:game.heroes[1].id}})",context);
assert.equal(vm.runInContext('page',context),'home');
assert.equal(vm.runInContext('game.selected===game.heroes[1].id',context),true);
assert(host.innerHTML.includes('aria-pressed="true"'));
const companySelected=vm.runInContext('game.selected',context);
vm.runInContext("actions['company-select']({dataset:{id:'missing'}})",context);
assert.equal(vm.runInContext('game.selected',context),companySelected);
console.log('Company selection stays on home, exposes pressed state and ignores missing heroes.');

vm.runInContext("game.heroes[0].career.floor=6;game.heroes[0].career.pool.played=8;game.heroes[1].career.floor=7;game.heroes[1].career.pool.played=1",context);
const originalOrder=vm.runInContext('game.heroes.map(h=>h.id).join()',context);
assert.equal(vm.runInContext('companyOrder()[0].id===game.heroes[1].id',context),true);
vm.runInContext('game.heroes[1].career.floor=6',context);
assert.equal(vm.runInContext('companyOrder()[0].id===game.heroes[0].id',context),true);
vm.runInContext('game.heroes[1].career.pool.played=8',context);
assert.equal(vm.runInContext('companyOrder().map(h=>h.id).join()',context),originalOrder);
assert.equal(vm.runInContext('game.heroes.map(h=>h.id).join()',context),originalOrder);
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}';selected().class=8`,context);
 const arena=vm.runInContext('arenaHero(selected())',context);
 assert(arena.indexOf('offense-summary')<arena.indexOf('hero-card'));
 assert(arena.includes(lang==='fr'?'Force · physique':'Strength · physical'));
 assert(arena.includes(lang==='fr'?'Tourelle':'Turret'));
 const detail=vm.runInContext('detail()',context);
 assert(!detail.includes('data-appearance='));assert(!detail.includes('energy-disclosure'));
 assert(detail.includes('energy-transfer'));assert(!detail.includes('Shared reserve:'));assert(!detail.includes('Seule l’énergie manquante'));
 vm.runInContext('startArtDemo()',context);
 const battle=vm.runInContext('battlePage()',context);assert.equal((battle.match(new RegExp((lang==='fr'?'Niv.':'Lv.')+' 5','g'))||[]).length,2);
}
console.log('Company sorting, creation-only appearance, offensive summary, battle levels and direct energy controls verified.');
