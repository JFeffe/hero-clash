import assert from 'node:assert/strict';
import {familiarFrame,prepareFamiliars} from '../docs/familiar-art.js';
assert.equal(familiarFrame(0),0);
assert.equal(familiarFrame(0,0,{run:true}),1);
assert.equal(familiarFrame(.15,0,{run:true}),2);
assert.equal(familiarFrame(0,1),3);
assert.equal(familiarFrame(0,1,{hurt:true}),4);
assert.equal(familiarFrame(0,1,{fallen:true,hurt:true}),5);
const data=new Uint8ClampedArray(1536*1024*4);
for(let row=0;row<2;row++)for(let col=0;col<3;col++)for(let y=200;y<400;y++)for(let x=200;x<400;x++)data[((row*512+y)*1536+col*512+x)*4+3]=255;
const source={width:1536,height:1024,getContext:()=>({getImageData:()=>({data})})};
const art=prepareFamiliars([source,source,source,source,source]);
let draws=0;const ctx={save(){},restore(){},translate(){},scale(){},drawImage(image,...args){assert.equal(image,source);assert(args.every(Number.isFinite));draws++;}};
for(let id=10;id<15;id++)for(const flip of [false,true])for(const state of [{},{run:true},{hurt:true},{fallen:true}]){
 const hero={inventory:[{id}],equipped:[-1,-1,0,-1]},before=JSON.stringify(hero);
 assert(art.draw(ctx,hero,100,100,3,flip,.1,1,state));assert.equal(JSON.stringify(hero),before);
}
assert.equal(draws,40);
assert.equal(art.draw(ctx,{inventory:[],equipped:[]},0,0,1,false,0,0),false);
assert.equal(prepareFamiliars([null]).draw(ctx,{inventory:[{id:10}],equipped:[-1,-1,0]},0,0,1,false,0,0),false);
console.log('Familiar animations, all five IDs, mirroring, absent-image fallback and non-mutating rendering verified.');
