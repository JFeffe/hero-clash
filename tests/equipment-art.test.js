import assert from 'node:assert/strict';
import {D,equipmentPool} from '../docs/engine.js';
import {equipmentAssets,WEAPON_SPRITES,drawNewWeapon,drawHeldObject,drawTurtle,drawObjectCombat,cleanEquipmentMagenta} from '../docs/equipment-art.js';
const calls=[];const ctx={save(){},restore(){},translate(...args){assert(args.every(Number.isFinite));},scale(...args){assert(args.every(Number.isFinite));},rotate(n){assert(Number.isFinite(n));},fillRect(){},beginPath(){},stroke(){},moveTo(){},lineTo(){},ellipse(){},arc(){},drawImage(sheet,...a){assert(a.every(Number.isFinite));assert(a[0]>=0&&a[1]>=0&&a[0]+a[2]<=sheet.width+.01&&a[1]+a[3]<=sheet.height+.01);calls.push({sheet,args:a});}};
equipmentAssets.weapons={width:1536,height:1024};equipmentAssets.objects={width:2048,height:683};
for(const cls of D.ACTIVE_CLASSES)for(const id of equipmentPool(cls,0).filter(id=>WEAPON_SPRITES[id]))for(let pose=0;pose<6;pose++){
 calls.length=0;assert(drawNewWeapon(ctx,id,100,150,pose,[40,150]));assert.equal(calls.length,WEAPON_SPRITES[id].paired?2:1);for(const c of calls)assert.deepEqual(c.args.slice(0,4),WEAPON_SPRITES[id].rect,'Shared weapon ID must always select the same pixels');
}
assert.equal(drawNewWeapon(ctx,999,0,0),false);
for(const id of [15,16,17,18,33,34]){const h={inventory:[{id}],equipped:[-1,-1,-1,0]},before=structuredClone(h);calls.length=0;assert(drawHeldObject(ctx,h,0,0));assert.equal(calls.length,1);drawObjectCombat(ctx,h,100,200,3,0,[{kind:'null',target:0,started:0}],0);drawObjectCombat(ctx,h,100,200,3,.2,[{kind:'hit',target:1,critical:true,started:0}],0,true);assert.deepEqual(h,before);}
const turtle={inventory:[{id:32}],equipped:[-1,-1,0,-1]};calls.length=0;assert(drawTurtle(ctx,turtle,100,200,2,false,0,0,{fallen:true}));assert.equal(calls[0].args[0],2048/6*5,'KO uses the closed-eye frame');
const pixels=new Uint8ClampedArray([255,0,255,255,110,40,175,255,90,170,65,255]);cleanEquipmentMagenta(pixels);assert.equal(pixels[3],0);assert.equal(pixels[7],255,'Purple amulet is preserved');assert.equal(pixels[11],255,'Green turtle is preserved');
console.log('Shared sprite identity, valid source bounds, paired weapons, six visible objects, non-mutating effects, turtle KO and chroma preservation verified.');
