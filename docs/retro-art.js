import {appearanceOf} from './appearance.js';
import {warriorEquipment} from './warrior-gear.js?v=0.12.1';

// Source sockets are measured on the generated atlases. Composites are drawn
// onto a 2:1 pixel grid once, then shared by portraits and combat.
const grips={
 warrior:[[76,98],[143,78],[82,90],[225,43],[104,91],[150,168]],
 mage:[[83,146],[104,129],[132,121],[230,84],[96,130],[130,210]]
};
const weaponRects=[
 [170,0,175,500,256,402,.60],[715,0,120,502,775,340,.66],
 [1220,0,105,502,1257,260,.68],[195,512,115,490,254,805,.83],
 [705,512,130,480,770,896,.40],[1185,512,195,490,1280,870,.59]
];

// Discover actual row bands: generated sheets can have uneven outer margins.
export function spriteRows(image,count){
 const {width,height}=image,ctx=image.getContext('2d');
 const pixels=ctx.getImageData(0,0,width,height).data,bands=[];
 let start=-1,last=-1;
 for(let y=0;y<height;y++){
  let occupied=false;
  for(let x=0;x<width;x++)if(pixels[(y*width+x)*4+3]>128){occupied=true;break;}
  if(occupied){if(start<0)start=y;last=y;}
  if(start>=0&&(!occupied&&y-last>8||y===height-1)){
   bands.push([start,last+1]);start=-1;
  }
 }
 if(bands.length!==count)throw new Error(`Expected ${count} sprite rows, found ${bands.length}`);
 return bands;
}

export function prepareRetro(warrior,mage,heads,weapons,makeCanvas){
 const rows={warrior:spriteRows(warrior,4),mage:spriteRows(mage,4),heads:spriteRows(heads,6)};
 const bodies=[warrior,...[1,2].map(tone=>{
  const c=makeCanvas(warrior.width,warrior.height),ctx=c.getContext('2d');ctx.drawImage(warrior,0,0);
  const p=ctx.getImageData(0,0,c.width,c.height),d=p.data;
  for(const [top] of rows.warrior)for(let index=0;index<6;index++){
   const nx=index*256+[135,138,128,127,115,38][index],ny=top+(index===5?147:8);
   for(let y=Math.max(0,ny-12);y<Math.min(c.height,ny+15);y++)for(let x=nx-14;x<nx+14;x++){
    const i=(y*c.width+x)*4,r=d[i],g=d[i+1],b=d[i+2];
    if(d[i+3]&&r>100&&g>65&&r>g*1.15&&g>b*1.12&&r-g<125){
     const factors=tone===1?[.80,.66,.58]:[.57,.43,.37];
     d[i]=r*factors[0];d[i+1]=g*factors[1];d[i+2]=b*factors[2];
    }
   }
  }
  ctx.putImageData(p,0,0);return c;
 })];
 const cache=new Map();
 function composite(h,index){
  const kind=h.class===0?'warrior':'mage',a=appearanceOf(h),{weapon,armor}=warriorEquipment(h);
  const key=[kind,armor,weapon,index,...(h.class===0?[a.gender,a.face,a.hair]:[])].join(':');
  if(cache.has(key))return cache.get(key);
  const c=makeCanvas(320,224),ctx=c.getContext('2d');
  const body=kind==='warrior'?bodies[a.face]:mage,[top,bottom]=rows[kind][armor];
  const left=index*256,pivot=left+128,baseline=bottom-1;
  ctx.imageSmoothingEnabled=false;ctx.translate(160,192);ctx.scale(.5,.5);
  const clipLeft=kind==='mage'&&index===5?left-16:left;
  const clipWidth=kind==='mage'&&index===4?240:kind==='mage'&&index===5?272:256;
  ctx.drawImage(body,clipLeft,top,clipWidth,bottom-top,clipLeft-pivot,top-baseline,clipWidth,bottom-top);
  if(kind==='warrior'){
   const row=a.gender*3+a.face,[ht,hb]=rows.heads[row],cw=heads.width/4;
   const neckX=[135,138,128,127,115,38][index]+left;
   const neckY=index===5?top+147:top+8;
   const angle=index===5?-Math.PI/2:index===4?-.32:0;
   const k=76/(hb-ht);
   ctx.save();ctx.translate(neckX-pivot,neckY-baseline);ctx.rotate(angle);ctx.scale(k,k);
   const edges=[[16,250],[268,504],[505,764],[780,1015]][a.hair];
   const sx=edges[0]*heads.width/1024,sw=(edges[1]-edges[0])*heads.width/1024;
   ctx.drawImage(heads,sx,ht,sw,hb-ht,sx-a.hair*cw-cw*.47,-(hb-ht)+4,sw,hb-ht);ctx.restore();
  }
  if(weapon!==null){
   const [sx,sy,w,height,gx,gy,length]=weaponRects[weapon];
   let [hx,hy]=grips[kind][index];hx+=left;hy+=top;
   // Fallen poses occupy only the last ~70 px of the row.
   if(index===5)hy=bottom-18;
   let angle=kind==='warrior'?(weapon===0||weapon===4?2.12:weapon===1?.48:.08):(weapon===1?Math.PI/2:weapon===0||weapon===4?.25:0);
   if(index===3)angle=weapon===2?.08:weapon===3?.45:Math.PI/2;
   if(index===5)angle=Math.PI/2;
   const k=250*length/height;
   ctx.save();ctx.translate(hx-pivot,hy-baseline);ctx.rotate(angle);ctx.scale(k,k);
   ctx.drawImage(weapons,sx,sy,w,height,sx-gx,sy-gy,w,height);ctx.restore();
   ctx.drawImage(body,hx-7,hy-7,14,14,hx-7-pivot,hy-7-baseline,14,14);
  }
  if(cache.size>=384)cache.delete(cache.keys().next().value);
  cache.set(key,c);return c;
 }
 return {rows,draw(ctx,h,index,x,ground,s,flip,time=0){
  const frame=composite(h,index),unit=s*54/64;
  const bob=index===0?Math.round(Math.sin(time*3)):0;
  ctx.save();ctx.imageSmoothingEnabled=false;ctx.translate(x,ground+bob*unit);
  ctx.scale(flip?-unit:unit,unit);ctx.drawImage(frame,-80,-96,160,112);ctx.restore();
 }};
}
