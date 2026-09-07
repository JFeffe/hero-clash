// Approved art, lossless WebP. Magenta is the runtime transparency key.
// Bounds are measured from the generated sheet; origin is feet/paws, not the image centre.
let sheet=null,pending;
export const atlasReady=()=>Boolean(sheet);
export function loadAtlas(){
 if(pending)return pending;
 if(typeof Image==='undefined')return Promise.resolve(false);
 pending=new Promise(resolve=>{const image=new Image();image.onload=()=>{
  try{const c=document.createElement('canvas');c.width=image.naturalWidth;c.height=image.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height),d=pixels.data;
   for(let i=0;i<d.length;i+=4){if(d[i]>180&&d[i+2]>150&&d[i+1]<115)d[i+3]=0;}
   ctx.putImageData(pixels,0,0);sheet=c;resolve(true);
  }catch(error){console.warn('Sprite atlas unavailable; using classic art.',error);resolve(false);}
 };image.onerror=()=>resolve(false);image.src=new URL('./assets/warrior-wolf-v1.webp',import.meta.url).href;});return pending;
}
const warriorFrames=[ [8,175,242,335,120,330], [256,195,255,315,128,310], [520,195,247,315,128,310], [770,140,310,370,128,365], [1064,195,215,315,120,310], [1280,430,255,80,128,75] ];
const wolfFrames=[ [5,680,247,222,125,217], [257,744,264,158,130,153], [535,744,230,158,118,153], [777,704,248,151,124,193], [1035,755,230,147,118,142], [1280,817,250,85,125,80] ];
export function animationFrame(time,pose={},fallen=false){
 if(fallen)return Number(fallen)<.45?4:5;
 if(pose.hurt)return 4;
 if(pose.attack>.68)return 3;
 if(pose.run>.05||pose.attack>.05)return 1+(Math.floor(time*11)%2);
 return 0;
}
function draw(ctx,frames,index,x,y,scale,flip,time,fallen){
 const [sx,sy,w,h,px,py]=frames[index];ctx.save();ctx.translate(x,y);ctx.scale(flip?-scale:scale,scale);
 // Attack cell extends above the next cell; clip away the neighbour's boot.
 if(frames===warriorFrames&&index===3){ctx.beginPath();ctx.moveTo(-px,-py);ctx.lineTo(w-px,-py);ctx.lineTo(w-px,260-sy-py);ctx.lineTo(1040-sx-px,260-sy-py);ctx.lineTo(1040-sx-px,h-py);ctx.lineTo(-px,h-py);ctx.closePath();ctx.clip();}
 const breathe=index===0&&!fallen?Math.sin(time*3)*1.4:0;
 ctx.imageSmoothingEnabled=false;ctx.drawImage(sheet,sx,sy,w,h,-px,-py+breathe,w,h);ctx.restore();
}
export function atlasWarrior(ctx,h,x,y,s,flip,time,fallen,pose){
 if(!sheet||h.class!==0||h.inventory[h.equipped[0]]?.id!==0)return false;
 const ground=y+27*s-(s*27-24)*(Number(fallen)||0),index=animationFrame(time,pose,fallen);
 draw(ctx,warriorFrames,index,x,ground,s*54/330,flip,time,fallen);return true;
}
export function atlasWolf(ctx,h,x,y,s,flip,time,action,state={}){
 if(!sheet||h.inventory[h.equipped[2]]?.id!==10)return false;
 const index=state.fallen?5:action?3:state.run?1+(Math.floor(time*12)%2):0;
 draw(ctx,wolfFrames,index,x,y+11*s,s*27/217,flip,time,state.fallen);return true;
}
