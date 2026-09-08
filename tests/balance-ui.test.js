// Render production templates with a minimal DOM host; this is not device/visual QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import * as appearance from '../docs/appearance.js';
import * as engine from '../docs/engine.js';
import * as progression from '../docs/progression.js';
import * as heroState from '../docs/hero-state.js';
import * as art from '../docs/art.js';
import {BALANCE as B} from '../docs/balance.js';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const h=engine.hero(1,4);h.inventory=[{id:14,level:1,rarity:0}];h.equipped=[-1,-1,0,-1];
const backup={version:2,revision:5,lang:'en',heroes:[h],graveyard:[],selected:h.id};
const host={innerHTML:'',style:{}};
const context=vm.createContext({...appearance,...engine,...progression,...heroState,...art,B,console,structuredClone,performance,crypto:webcrypto,
 localStorage:{getItem:()=>JSON.stringify(backup),setItem:()=>{}},
 document:{querySelector:()=>host,querySelectorAll:()=>[],documentElement:{},addEventListener:()=>{}},
 window:{matchMedia:()=>({matches:false}),addEventListener:()=>{},scrollTo:()=>{}},
 cancelAnimationFrame:()=>{},requestAnimationFrame:()=>0,setInterval:()=>{},setTimeout:()=>0,clearTimeout:()=>{}});
vm.runInContext(fs.readFileSync('docs/app.js','utf8').replace(/^import .*;\n/gm,''),context);
assert(host.innerHTML.includes(JSON.parse(fs.readFileSync('package.json','utf8')).version));
for(const lang of ['fr','en']){
 vm.runInContext(`game.lang='${lang}'`,context);
 const html=vm.runInContext('fullHeroSheet(selected())',context);
 assert(!/NaN|undefined/.test(html));
 const f=engine.fighter(h),expected=((7+f.classAttack+h.stats[0]*1.45)*f.physical).toFixed(1);
 assert(html.includes(expected));assert(html.includes('1.90'));
 const settings=vm.runInContext('options()',context);assert(settings.includes(lang==='en'?'fixed amount of HP':'nombre fixe de PV'));
 assert(!settings.includes('rare: +5% speed'));assert(!settings.includes('rare : vitesse +5 %'));
 const classes=vm.runInContext('classes()',context);assert(classes.includes(lang==='en'?'Weak against':'Désavantage contre'));
 for(let id=0;id<19;id++)for(let tier=0;tier<3;tier++){
 const text=vm.runInContext(`itemText({id:${id},level:20,rarity:${tier}})`,context);
 assert(!/NaN|undefined/.test(text));
 }
}
console.log('French/English balance templates, displayed equipped damage, fixed Fairy healing, all item descriptions and old-save loading verified.');

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
for(const cls of [0,1,2,3,4,5,6,7,8,9,10,12])for(const petId of [-1,10,11,12,13,14]){
 vm.runInContext(`startArtDemo(${cls},${petId})`,context);
 assert.equal(vm.runInContext('battle.heroes[0].class',context),cls);
 assert.equal(vm.runInContext('battle.heroes[0].inventory[battle.heroes[0].equipped[2]]?.id??-1',context),petId);
 assert.equal(vm.runInContext("JSON.stringify(game,(k,v)=>k==='energy_time'?undefined:v)",context),careerBefore);
 assert(vm.runInContext('battle.result.events.length>0',context));
}
console.log('All 72 class/familiar showcases preserve the company save.');
