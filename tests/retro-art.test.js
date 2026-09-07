import assert from 'node:assert/strict';
import {prepareRetro,spriteRows} from '../docs/retro-art.js';
import {appearanceFromLook} from '../docs/appearance.js';

let draws=0,created=0;const sources=[];
function canvas(width,height,bands=[]){
 const result={width,height};
 const ctx={imageSmoothingEnabled:true,fillRect(){},fill(){},closePath(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},save(){},restore(){},translate(...a){assert(a.every(Number.isFinite));},scale(...a){assert(a.every(Number.isFinite));},rotate(a){assert(Number.isFinite(a));},
  drawImage(source,...args){sources.push(source);assert(source);assert(args.every(Number.isFinite));draws++;},putImageData(){},
  getImageData(){const data=new Uint8ClampedArray(width*height*4);for(const [top,bottom] of bands)for(let y=top;y<bottom;y++)data[y*width*4+3]=255;return {data};}};
 result.getContext=()=>ctx;return result;
}
const body=canvas(1536,1024,[[58,251],[297,489],[535,728],[773,968]]);
const mage=canvas(1536,1024,[[18,249],[260,494],[504,737],[748,981]]);
const heads=canvas(1024,1536,[[37,236],[261,465],[496,697],[724,941],[965,1187],[1208,1442]]);
assert.throws(()=>spriteRows(canvas(10,10),4),/Expected 4/);
const koHeads=canvas(1024,1536,[[37,236],[261,465],[496,697],[724,941],[965,1187],[1208,1442]]);
const art=prepareRetro(body,mage,heads,canvas(1536,1024),(w,h)=>{created++;return canvas(w,h);},body,body,body,body,koHeads,body,null,body);
const ctx=canvas(800,600).getContext('2d');
let count=0;
for(const cls of [0,1,2,4,6,7,10,12])for(let identity=0;identity<24;identity++)for(let armor=6;armor<=9;armor++)for(let weapon=-1;weapon<6;weapon++)for(let pose=0;pose<6;pose++)for(const flip of [false,true]){
 const hero={class:cls,appearance:appearanceFromLook(identity),inventory:[{id:armor},{id:weapon}],equipped:[weapon<0?-1:1,0]};
 const saved=JSON.stringify(hero);art.draw(ctx,hero,pose,200,400,3.5,flip,.3);assert.equal(JSON.stringify(hero),saved);count++;
}
const legacy={class:0,inventory:[],equipped:[]};
art.draw(ctx,legacy,0,200,400,1,false);const before=created;
art.draw(ctx,legacy,0,200,400,1,true);assert.equal(created,before,'Direction shares the cached sprite');
assert(!Object.hasOwn(legacy,'appearance'));assert(draws>count);
console.log(`${count} retro renders: all Warrior, Archer, Mage, Knight, Ninja, Monk, Necromancer and Boxer identities, equipment, poses, directions, legacy saves and shared cache verified.`);

assert.equal(art.hasNecro,true);
assert.equal(prepareRetro(body,mage,heads,canvas(1536,1024),canvas,body).hasNecro,false);

assert.equal(art.hasBoxer,true);
assert.equal(prepareRetro(body,mage,heads,canvas(1536,1024),canvas,body,body).hasBoxer,false);

assert.equal(art.hasMonk,true);
assert.equal(prepareRetro(body,mage,heads,canvas(1536,1024),canvas).hasMonk,false);
assert.equal(art.hasNinja,true);
assert.equal(art.hasKnight,true);
assert.equal(prepareRetro(body,mage,heads,canvas(1536,1024),canvas,body,body,body,body,koHeads).hasKnight,false);
assert.equal(art.hasKO,true);
const shield=canvas(1254,1254);
const shieldArt=prepareRetro(body,mage,heads,canvas(1536,1024),canvas,body,body,body,body,koHeads,body,shield);
for(let weapon=-1;weapon<6;weapon++)for(const pose of [0,3,5]){
 const h={class:4,appearance:appearanceFromLook(0),inventory:[{id:weapon},{id:6}],equipped:[weapon<0?-1:0,1]};
 sources.length=0;shieldArt.draw(ctx,h,pose,0,0,1,false);
 assert.equal(sources.includes(shield),[-1,0,4,5].includes(weapon),'Shield stays on the free arm only');
}
for(const cls of [0,1,2,4,6,7,10,12]){
 const art=prepareRetro(body,mage,heads,canvas(1536,1024),canvas,body,body,body,body,koHeads,body,null,body);
 const h={class:cls,appearance:appearanceFromLook(23),inventory:[],equipped:[]};
 sources.length=0;art.draw(ctx,h,5,0,0,1,false);
 assert(sources.includes(koHeads),'KO must use closed-eye heads');assert(!sources.includes(heads));
 sources.length=0;art.draw(ctx,h,0,0,0,1,false);
 assert(sources.includes(heads),'Idle must retain normal expression');assert(!sources.includes(koHeads));
}
