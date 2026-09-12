import * as bastion from '../docs/bastion.js';
import * as wallet from '../docs/wallet.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as appearance from '../docs/appearance.js';
import * as engine from '../docs/engine.js';
import * as progression from '../docs/progression.js';
import * as heroState from '../docs/hero-state.js';
import * as art from '../docs/art.js';
import {BALANCE as B} from '../docs/balance.js';
import {drawWarriorGear} from '../docs/warrior-gear.js';

const {appearanceFromLook,appearanceOf,setAppearance,validAppearance}=appearance;
assert.equal(new Set(Array.from({length:24},(_,i)=>JSON.stringify(appearanceFromLook(i)))).size,24);
for(const cls of engine.D.ACTIVE_CLASSES)assert(validAppearance(engine.hero(1,cls).appearance));
const legacy=engine.hero(1,0);delete legacy.appearance;
const before=JSON.stringify(legacy);
assert.deepEqual(appearanceOf(legacy),{gender:0,face:0,hair:0});assert.equal(JSON.stringify(legacy),before);
for(const bad of [null,{}, {gender:2,face:0,hair:0},{gender:0,face:-1,hair:0},{gender:0,face:0,hair:4},{gender:0,face:0,hair:'1'}])assert(!validAppearance(bad));
assert(!setAppearance(legacy,'__proto__',0));assert(!setAppearance(legacy,'hair',NaN));
const opponent=engine.hero(1,0),result=engine.simulate(legacy,opponent,417);
assert(setAppearance(legacy,'gender',1));assert(setAppearance(legacy,'face',2));assert(setAppearance(legacy,'hair',3));
assert.deepEqual(engine.simulate(legacy,opponent,417),result);
assert.deepEqual(appearanceOf(JSON.parse(JSON.stringify(legacy))),legacy.appearance);

let count=0,headCalls=0;const heads={width:1086,height:1448};
const ctx={save(){},restore(){},translate(){},scale(){},rotate(){},drawImage(image,...args){assert(args.every(Number.isFinite));if(image===heads)headCalls++;}};
for(let identity=0;identity<24;identity++)for(let armor=6;armor<=9;armor++)for(let weapon=-1;weapon<6;weapon++)for(let pose=0;pose<6;pose++)for(const flip of [false,true]){
 const h={appearance:appearanceFromLook(identity),inventory:[{id:armor},{id:weapon}],equipped:[weapon<0?-1:1,0]};
 drawWarriorGear(ctx,{}, {},h,pose,120,300,4,flip,.2,heads);count++;
}
assert.equal(headCalls,count);

const h=engine.hero(1,0),backup={version:2,ruleset:engine.RULESET,lang:'fr',heroes:[h],graveyard:[],selected:h.id};
const events={},nodes={app:{innerHTML:'',setAttribute(){}},name:{value:'Ariane'},focus:{focus(){}}};let saved,scroll;
const context=vm.createContext({...bastion,...wallet,...engine,...progression,...heroState,...art,...appearance,B,console,crypto,structuredClone,performance,
 localStorage:{getItem:()=>JSON.stringify(backup),setItem:(key,value)=>{saved=JSON.parse(value);}},
 document:{body:{dataset:{}},querySelector:s=>s==='#hero-name'?nodes.name:s.startsWith('[data-appearance')?nodes.focus:nodes.app,querySelectorAll:()=>[],documentElement:{},addEventListener:(type,fn)=>{events[type]=fn;}},
 window:{scrollY:432,matchMedia:()=>({matches:false}),addEventListener(){},scrollTo:(x,y)=>{scroll=y;}},
 cancelAnimationFrame(){},requestAnimationFrame:()=>0,setInterval(){},setTimeout:()=>0,clearTimeout(){}});
vm.runInContext(fs.readFileSync('docs/app.js','utf8').replace(/^import .*;\n/gm,''),context);

for(const cls of engine.D.ACTIVE_CLASSES)for(const lang of ['en','fr']){
 vm.runInContext(`game.lang='${lang}';game.heroes[0].class=${cls};game.heroes[0].inventory=hero(1,${cls}).inventory;page='detail';render()`,context);
 assert(!nodes.app.innerHTML.includes('data-appearance='));
 const before=vm.runInContext('JSON.stringify(game.heroes[0].appearance)',context);
 await events.change({target:{dataset:{appearance:'gender'},value:'1'}});
 await events.change({target:{dataset:{appearance:'hair'},value:'3'}});
 assert.equal(vm.runInContext('JSON.stringify(game.heroes[0].appearance)',context),before);
 vm.runInContext(`candidate=hero(1,${cls});page='recruit';render()`,context);
 assert(!nodes.app.innerHTML.includes('data-appearance='));
 const rolled=vm.runInContext('JSON.stringify(candidate.appearance)',context);
 await events.change({target:{dataset:{appearance:'hair'},value:'3'}});
 assert.equal(vm.runInContext('JSON.stringify(candidate.appearance)',context),rolled);
}
vm.runInContext('actions.confirm()',context);
assert.deepEqual(saved.heroes.at(-1).appearance,JSON.parse(vm.runInContext('JSON.stringify(game.heroes.at(-1).appearance)',context)));
assert.equal(saved.heroes.at(-1).name,'Ariane');
assert(vm.runInContext('validSave(game)',context));
vm.runInContext('game.heroes[0].appearance.hair=99',context);assert(!vm.runInContext('validSave(game)',context));
vm.runInContext('delete game.heroes[0].appearance',context);assert(vm.runInContext('validSave(game)',context));
console.log('All active classes: random appearance preserved during recruitment and after creation; legacy saves remain valid.');
