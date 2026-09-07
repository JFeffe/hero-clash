import {weapons,warriorEquipment} from './warrior-gear.js?v=0.10.0';

// Measured against mage-armors-v1.webp. Unequal row bounds keep hair and boots
// inside their own frame; all standing poses use the same on-screen height.
const rows=[[0,275,267],[275,530,527],[534,790,786],[793,1024,1015]];
const columns=[[0,255],[256,511],[512,749],[750,1021],[1022,1259],[1260,1536]];
const hands=[
 [[200,105],[466,122],[702,132],[1001,78],[1219,66],[1400,247]],
 [[200,368],[466,386],[702,394],[1001,339],[1219,330],[1400,510]],
 [[200,618],[466,638],[702,648],[1001,588],[1219,588],[1410,770]],
 [[200,881],[466,901],[702,910],[1001,844],[1219,843],[1400,999]]
];
export function drawMageGear(ctx,body,gear,h,index,x,ground,s,flip,time=0){
 const {weapon,armor}=warriorEquipment(h);
 const [top,bottom,baseline]=rows[armor], [left,right]=columns[index];
 const height=baseline-top, scale=s*54/height, pivot=(left+right)/2;
 ctx.save();ctx.translate(x,ground+(index===0?Math.sin(time*3)*1.4*scale:0));
 ctx.scale(flip?-scale:scale,scale);ctx.imageSmoothingEnabled=false;
 ctx.drawImage(body,left,top,right-left,bottom-top,left-pivot,top-baseline,right-left,bottom-top);
 if(weapon!==null){
  const [sx,sy,w,ht,gx,gy,length]=weapons[weapon], [hx,hy]=hands[armor][index];
  let angle=weapon===1?Math.PI/2:weapon===0||weapon===4?.25:0;
  if(index===3)angle=weapon===2?0:weapon===3?.45:Math.PI/2;
  if(index===5)angle=Math.PI/2;
  const k=height*length/ht;
  ctx.save();ctx.translate(hx-pivot,hy-baseline);ctx.rotate(angle);ctx.scale(k,k);
  ctx.drawImage(gear,sx,sy,w,ht,sx-gx,sy-gy,w,ht);ctx.restore();
  ctx.drawImage(body,hx-7,hy-7,14,14,hx-7-pivot,hy-7-baseline,14,14);
 }
 ctx.restore();
}
