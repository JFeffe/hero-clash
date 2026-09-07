import {appearanceOf} from './appearance.js';
import {warriorEquipment} from './warrior-gear.js?v=0.19.0';

// Source sockets are measured on the generated atlases. Composites are drawn
// onto a 2:1 pixel grid once, then shared by portraits and combat.
const grips={
 knight:[[177,77],[194,69],[194,69],[232,34],[214,47],[151,180]],
 ninja:[[177,77],[194,69],[194,69],[232,34],[214,47],[151,180]],
 boxer:[[177,76],[194,70],[194,70],[235,34],[214,43],[151,180]],
 necro:[[190,104],[190,76],[192,65],[230,42],[211,45],[135,168]],
 archer:[[190,104],[190,76],[192,65],[230,42],[211,45],[135,168]],
 warrior:[[76,98],[143,78],[82,90],[225,43],[104,91],[150,168]],
 mage:[[83,146],[104,129],[132,121],[230,84],[96,130],[130,210]]
};
const knightOffhand=[[82,78],[94,78],[94,78],[80,68],[116,79],[120,180]];
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

// Mage atlas sockets and hair silhouettes, measured relative to each row.
const mageNecks=[[137,86],[162,90],[156,90],[138,89],[123,105],[98,180]];
const mageMasks=[
 [[35,-18],[195,-18],[195,75],[170,92],[120,75],[101,67],[84,83],[76,112],[35,112]],
 [[35,-18],[205,-18],[205,81],[178,96],[142,80],[128,67],[111,66],[92,82],[35,103]],
 [[30,-18],[207,-18],[207,80],[180,95],[137,79],[120,69],[104,82],[30,108]],
 [[30,-18],[190,-18],[190,76],[158,94],[123,78],[103,65],[83,78],[72,99],[30,108]],
 [[28,-18],[177,-18],[177,79],[151,95],[107,94],[88,103],[78,132],[28,144]],
 [[-16,126],[79,126],[89,143],[94,170],[85,198],[82,216],[-16,239]]
];
function inside(x,y,polygon){
 let hit=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const [ax,ay]=polygon[i],[bx,by]=polygon[j];
  if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)hit=!hit;
 }
 return hit;
}
function prepareMageBodies(mage,rows,makeCanvas){
 return [0,1,2].map(tone=>{
  const c=makeCanvas(mage.width,mage.height),ctx=c.getContext('2d');ctx.drawImage(mage,0,0);
  const p=ctx.getImageData(0,0,c.width,c.height),d=p.data;
  for(let armor=0;armor<4;armor++){
   const [top,bottom]=rows[armor];
   for(let frame=0;frame<6;frame++){
    for(let y=top;y<bottom;y++)for(let x=Math.max(0,frame*256-16);x<Math.min(c.width,(frame+1)*256);x++){
     const lx=x-frame*256,ly=y-top,i=(y*c.width+x)*4;
     // The fallen body stays close to the bottom of its row.
     const maskY=frame===5?ly-(bottom-top-231):ly;
     if(inside(lx,maskY,mageMasks[frame])){d[i+3]=0;continue;}
     const r=d[i],g=d[i+1],b=d[i+2];
     // Exposed skin is peach; purple fabric, gold trim and armor are excluded.
     if(tone&&d[i+3]&&r>110&&g>65&&b>45&&r>g*1.2&&g>b*1.2&&r-g<100&&g-b<85){
      const f=tone===1?[.80,.66,.58]:[.57,.43,.37];
      d[i]=r*f[0];d[i+1]=g*f[1];d[i+2]=b*f[2];
     }
    }
   }
  }
  ctx.putImageData(p,0,0);return c;
 });
}

export function prepareRetro(warrior,mage,heads,weapons,makeCanvas,archer=null,necro=null,boxer=null,ninja=null,koHeads=null,knight=null,knightShield=null){
 const rows={warrior:spriteRows(warrior,4),mage:spriteRows(mage,4),heads:spriteRows(heads,6)};
 if(archer)rows.archer=spriteRows(archer,4);
 if(necro)rows.necro=spriteRows(necro,4);
 if(boxer)rows.boxer=spriteRows(boxer,4);
 if(ninja)rows.ninja=spriteRows(ninja,4);
 if(knight)rows.knight=spriteRows(knight,4);
 if(koHeads)rows.koHeads=spriteRows(koHeads,6);
 function tintBodies(warrior,bands){return [warrior,...[1,2].map(tone=>{
  const c=makeCanvas(warrior.width,warrior.height),ctx=c.getContext('2d');ctx.drawImage(warrior,0,0);
  const p=ctx.getImageData(0,0,c.width,c.height),d=p.data;
  for(const [top] of bands)for(let index=0;index<6;index++){
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
 })];}
 const ninjaBodies=ninja?tintBodies(ninja,rows.ninja):null;
 const knightBodies=knight?[knight,...[1,2].map(tone=>{
  const c=makeCanvas(knight.width,knight.height),ctx=c.getContext('2d');ctx.drawImage(knight,0,0);
  const p=ctx.getImageData(0,0,c.width,c.height),d=p.data,f=tone===1?[.80,.66,.58]:[.57,.43,.37];
  // Only exposed neck/chest and fingertips; keep gold trim and blue cloth intact.
  for(const [top,bottom] of rows.knight)for(let frame=0;frame<6;frame++){
   const neck=[[130,18],[139,18],[135,18],[122,18],[102,18],[33,bottom-top-49]][frame];
   const points=[neck,grips.knight[frame],knightOffhand[frame]];
   for(let j=0;j<points.length;j++){
    const [px,py]=points[j],nx=frame*256+px,ny=j&&frame===5?bottom-18:top+py;
    for(let y=Math.max(top,ny-14);y<Math.min(bottom,ny+(j?14:30));y++)for(let x=nx-15;x<nx+15;x++){
     const i=(y*c.width+x)*4,r=d[i],g=d[i+1],b=d[i+2];
     if(d[i+3]&&r>150&&g>80&&b>50&&r>g*1.2&&g>b*1.15&&r-g<105&&g-b<70){d[i]=r*f[0];d[i+1]=g*f[1];d[i+2]=b*f[2];}
    }
   }
  }
  ctx.putImageData(p,0,0);return c;
 })]:null;
 const bodies=tintBodies(warrior,rows.warrior);
 const archerBodies=archer?tintBodies(archer,rows.archer):null;
 const necroBodies=necro?tintBodies(necro,rows.necro):null;
 // Boxer arms and legs are exposed, so recolor the whole skin palette.
 const boxerBodies=boxer?[boxer,...[1,2].map(tone=>{
  const c=makeCanvas(boxer.width,boxer.height),ctx=c.getContext('2d');ctx.drawImage(boxer,0,0);
  const p=ctx.getImageData(0,0,c.width,c.height),d=p.data,f=tone===1?[.80,.66,.58]:[.57,.43,.37];
  for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2];
   if(d[i+3]&&r>150&&g>85&&b>45&&r>g*1.2&&g>b*1.2&&r-g<105&&g-b<85){d[i]=r*f[0];d[i+1]=g*f[1];d[i+2]=b*f[2];}
  }
  ctx.putImageData(p,0,0);return c;
 })]:null;
 const mageBodies=prepareMageBodies(mage,rows.mage,makeCanvas);
 const cache=new Map();
 function composite(h,index){
  const kind=h.class===4?'knight':h.class===6?'ninja':h.class===0?'warrior':h.class===1?'archer':h.class===10?'necro':h.class===12?'boxer':'mage',a=appearanceOf(h),{weapon,armor}=warriorEquipment(h);
  const key=[kind,armor,weapon,index,a.gender,a.face,a.hair].join(':');
  if(cache.has(key))return cache.get(key);
  const c=makeCanvas(320,224),ctx=c.getContext('2d');
  const body=kind==='knight'?knightBodies[a.face]:kind==='ninja'?ninjaBodies[a.face]:kind==='warrior'?bodies[a.face]:kind==='archer'?archerBodies[a.face]:kind==='necro'?necroBodies[a.face]:kind==='boxer'?boxerBodies[a.face]:mageBodies[a.face],[top,bottom]=rows[kind][armor];
  const left=index*256,pivot=left+128,baseline=bottom-1;
  ctx.imageSmoothingEnabled=false;ctx.translate(160,192);ctx.scale(.5,.5);
  const clipLeft=kind==='mage'&&index===5?left-16:left;
  const clipWidth=kind==='mage'&&index===4?240:kind==='mage'&&index===5?272:256;
  // Draw a skin bridge behind the clothing: the Mage's removed fixed head
  // also removed its neck. Clothing occludes the lower edge of this bridge.
  if(kind==='mage'){
   const nx=left+mageNecks[index][0],ny=index===5?bottom-40:top+mageNecks[index][1];
   ctx.save();ctx.translate(nx-pivot,ny-baseline);
   ctx.rotate(index===5?-Math.PI/2:index===4?.32:0);
   ctx.fillStyle=['#e5a073','#a96845','#75432e'][a.face];ctx.fillRect(-12,-8,24,30);
   ctx.fillStyle=['#b36d4c','#80472f','#512d23'][a.face];ctx.fillRect(-12,-8,6,30);
   ctx.restore();
  }
  ctx.drawImage(body,clipLeft,top,clipWidth,bottom-top,clipLeft-pivot,top-baseline,clipWidth,bottom-top);
  // The class shield follows the free forearm. Two-handed weapons leave it off.
  // This is a cosmetic part of the Knight, never an extra inventory/stat item.
  if(kind==='knight'&&knightShield&&(weapon===null||[0,4,5].includes(weapon))){
   const [hx,hy]=knightOffhand[index];
   ctx.save();ctx.translate(left+hx-pivot,index===5?bottom-32-baseline:top+hy-baseline);
   ctx.rotate(index===5?-Math.PI/2:index===4?-.28:.08);
   ctx.drawImage(knightShield,338,109,590,1008,-37,-48,75,128);ctx.restore();
  }
  {
   const faceSheet=index===5&&koHeads?koHeads:heads;
   const row=a.gender*3+a.face,[ht,hb]=(index===5&&koHeads?rows.koHeads:rows.heads)[row],cw=faceSheet.width/4;
   const neckX=(kind==='knight'?[130,139,135,122,102,33][index]:kind==='ninja'?[130,139,135,122,102,33][index]:kind==='boxer'?[130,139,135,122,102,38][index]:kind!=='mage'?[130,133,123,122,110,38][index]:mageNecks[index][0])+left;
   const neckY=kind==='knight'?(index===5?bottom-49:top+15):kind==='ninja'?(index===5?bottom-49:top+15):kind==='boxer'?(index===5?bottom-46:top+15):kind!=='mage'?(index===5?top+147:top+15):(index===5?bottom-40:top+mageNecks[index][1]);
   const angle=index===5?-Math.PI/2:index===4?(kind==='mage'?.32:-.32):0;
   const k=76/(hb-ht);
   ctx.save();ctx.translate(neckX-pivot,neckY-baseline);ctx.rotate(angle);ctx.scale(k,k);
   const edges=[[16,250],[268,504],[505,764],[780,1015]][a.hair];
   const sx=edges[0]*faceSheet.width/1024,sw=(edges[1]-edges[0])*faceSheet.width/1024;
   ctx.drawImage(faceSheet,sx,ht,sw,hb-ht,sx-a.hair*cw-cw*.47,-(hb-ht)+4,sw,hb-ht);
   // Small cloth mask is a code-native equipment layer, below the eyelids.
   if(kind==='ninja'){
    ctx.fillStyle='#272737';ctx.beginPath();ctx.moveTo(-7,-60);ctx.lineTo(70,-54);ctx.lineTo(64,-17);ctx.lineTo(22,-5);ctx.lineTo(-7,-28);ctx.closePath();ctx.fill();
    ctx.fillStyle='#444056';ctx.fillRect(1,-50,56,6);
   }
   ctx.restore();
  }
  if(weapon!==null){
   const [sx,sy,w,height,gx,gy,length]=weaponRects[weapon];
   let [hx,hy]=grips[kind][index];hx+=left;hy+=top;
   // Fallen poses occupy only the last ~70 px of the row.
   if(index===5)hy=bottom-18;
   let angle=kind==='warrior'?(weapon===0||weapon===4?2.12:weapon===1?.48:.08):(weapon===1?Math.PI/2:weapon===0||weapon===4?.25:0);
   if(index===3)angle=weapon===2?(kind==='archer'?0:.08):weapon===3?.45:Math.PI/2;
   if(index===5)angle=Math.PI/2;
   const k=250*length/height;
   ctx.save();ctx.translate(hx-pivot,hy-baseline);ctx.rotate(angle);ctx.scale(k,k);
   if(kind==='archer'&&weapon===2){
    // Mirror the bow so its limbs face the target; draw its string separately.
    ctx.scale(-1,1);ctx.drawImage(weapons,sx,sy,84,height,sx-gx,sy-gy,84,height);
   }else ctx.drawImage(weapons,sx,sy,w,height,sx-gx,sy-gy,w,height);
   ctx.restore();
   if(kind==='archer'&&weapon===2&&index!==5){
    const bx=hx-pivot,by=hy-baseline,pull=index===3?left+85-pivot:bx-17;
    ctx.strokeStyle='#e8d6ab';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx-13,by-83);ctx.lineTo(pull,by+10);ctx.lineTo(bx-13,by+78);ctx.stroke();
    if(index===3){ctx.strokeStyle='#b99255';ctx.beginPath();ctx.moveTo(pull,by+10);ctx.lineTo(bx+32,by+10);ctx.stroke();ctx.fillStyle='#e7e8df';ctx.fillRect(bx+28,by+7,9,6);}
   }
   ctx.drawImage(body,hx-7,hy-7,14,14,hx-7-pivot,hy-7-baseline,14,14);
  }
  if(cache.size>=384)cache.delete(cache.keys().next().value);
  cache.set(key,c);return c;
 }
 return {rows,hasKnight:Boolean(knight),hasNinja:Boolean(ninja),hasKO:Boolean(koHeads),hasArcher:Boolean(archer),hasNecro:Boolean(necro),hasBoxer:Boolean(boxer),draw(ctx,h,index,x,ground,s,flip,time=0){
  const frame=composite(h,index),unit=s*54/64;
  const bob=index===0?Math.round(Math.sin(time*3)):0;
  ctx.save();ctx.imageSmoothingEnabled=false;ctx.translate(x,ground+bob*unit);
  ctx.scale(flip?-unit:unit,unit);ctx.drawImage(frame,-80,-96,160,112);ctx.restore();
 }};
}
