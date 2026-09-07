import assert from 'node:assert/strict';
import {warriorEquipment} from '../docs/warrior-gear.js';
import {drawMageGear as drawWarriorGear} from '../docs/mage-gear.js';
const calls=[];const ctx={save(){},restore(){},translate(){},scale(){},rotate(){},drawImage(...args){assert(args.slice(1).every(Number.isFinite));calls.push(args);}};
for(let a=6;a<=9;a++)for(let w=0;w<6;w++){
 const h={inventory:[{id:a},{id:10},{id:w}],equipped:[2,0,1]};
 assert.deepEqual(warriorEquipment(h),{weapon:w,armor:a-6});
 for(let frame=0;frame<6;frame++)for(const flip of [false,true]){calls.length=0;drawWarriorGear(ctx,'body','gear',h,frame,100,300,4,flip,0);assert.equal(calls.length,3);assert.equal(calls[1][0],'gear');}
}
assert.deepEqual(warriorEquipment({inventory:[],equipped:[]}),{weapon:null,armor:2});
console.log('24 loadouts × 6 poses × 2 directions; shuffled inventory IDs and finite render coordinates verified.');
