import assert from 'node:assert/strict';
import {cleanSpriteMatte} from '../docs/sprite-matte.js';
const w=9,h=9,data=new Uint8ClampedArray(w*h*4);
for(let i=0;i<data.length;i+=4)data.set([100,90,85,255],i);
const set=(x,y,v)=>data.set(v,(y*w+x)*4),get=(x,y)=>Array.from(data.slice((y*w+x)*4,(y*w+x)*4+4));
set(0,0,[255,0,255,255]);set(1,0,[100,20,105,255]); // bright and dark key
set(2,1,[62,30,64,255]);set(2,2,[58,43,62,255]); // fringe and weaker spill
set(1,2,[160,35,45,255]);set(0,2,[90,91,110,255]); // cloak and fur
set(8,8,[58,43,62,255]); // matching hue in interior must survive
cleanSpriteMatte(data,w,h);
assert.equal(get(0,0)[3],0);assert.equal(get(1,0)[3],0);assert.equal(get(2,1)[3],0);
assert.deepEqual(get(2,2),[49,43,49,255]);
assert.deepEqual(get(1,2),[160,35,45,255]);assert.deepEqual(get(0,2),[90,91,110,255]);
assert.deepEqual(get(8,8),[58,43,62,255]);
console.log('Bright/dark magenta, edge despill, warm reds, fur and interior colours verified.');
const {cleanGreenMatte}=await import('../docs/sprite-matte.js');
const green=new Uint8ClampedArray([0,255,0,255,25,95,30,255,110,30,140,255,210,160,35,255]);
cleanGreenMatte(green,4,1);
assert.equal(green[3],0);assert.equal(green[7],0);
assert.deepEqual(Array.from(green.slice(8)),[110,30,140,255,210,160,35,255]);
console.log('Mage green fringe removed while preserving purple and amber.');
