import assert from 'node:assert/strict';
import {prepareRetro,spriteRows} from '../docs/retro-art.js';
import {appearanceFromLook} from '../docs/appearance.js';

let draws=0,created=0;
function canvas(width,height,bands=[]){
 const result={width,height};
 const ctx={imageSmoothingEnabled:true,fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},save(){},restore(){},translate(...a){assert(a.every(Number.isFinite));},scale(...a){assert(a.every(Number.isFinite));},rotate(a){assert(Number.isFinite(a));},
  drawImage(source,...args){assert(source);assert(args.every(Number.isFinite));draws++;},putImageData(){},
  getImageData(){const data=new Uint8ClampedArray(width*height*4);for(const [top,bottom] of bands)for(let y=top;y<bottom;y++)data[y*width*4+3]=255;return {data};}};
 result.getContext=()=>ctx;return result;
}
const body=canvas(1536,1024,[[58,251],[297,489],[535,728],[773,968]]);
const mage=canvas(1536,1024,[[18,249],[260,494],[504,737],[748,981]]);
const heads=canvas(1024,1536,[[37,236],[261,465],[496,697],[724,941],[965,1187],[1208,1442]]);
assert.throws(()=>spriteRows(canvas(10,10),4),/Expected 4/);
const art=prepareRetro(body,mage,heads,canvas(1536,1024),(w,h)=>{created++;return canvas(w,h);},body);
const ctx=canvas(800,600).getContext('2d');
let count=0;
for(const cls of [0,1,2])for(let identity=0;identity<24;identity++)for(let armor=6;armor<=9;armor++)for(let weapon=-1;weapon<6;weapon++)for(let pose=0;pose<6;pose++)for(const flip of [false,true]){
 const hero={class:cls,appearance:appearanceFromLook(identity),inventory:[{id:armor},{id:weapon}],equipped:[weapon<0?-1:1,0]};
 const saved=JSON.stringify(hero);art.draw(ctx,hero,pose,200,400,3.5,flip,.3);assert.equal(JSON.stringify(hero),saved);count++;
}
const legacy={class:0,inventory:[],equipped:[]};
art.draw(ctx,legacy,0,200,400,1,false);const before=created;
art.draw(ctx,legacy,0,200,400,1,true);assert.equal(created,before,'Direction shares the cached sprite');
assert(!Object.hasOwn(legacy,'appearance'));assert(draws>count);
console.log(`${count} retro renders: all Warrior, Archer and Mage identities, both classes, equipment, poses, directions, legacy saves and shared cache verified.`);
