import {loadEquipmentArt} from './equipment-art.js';
import {FAMILIARS,prepareFamiliars} from './familiar-art.js?v=0.29.0';
import {prepareRetro} from './retro-art.js?v=0.29.0';
import {prepareWarriorBodies} from './warrior-identity.js';
import {appearanceOf,validAppearance} from './appearance.js?v=0.29.0';
import {drawWarriorGear} from './warrior-gear.js?v=0.29.0';
import {cleanSpriteMatte,cleanGreenMatte} from './sprite-matte.js?v=0.29.0';
let sheet=null,mageSheet=null,warriorBody=null,warriorWeapons=null,warriorHeads=null,warriorBodies=null,retro=null,familiars=null,pending;
export const atlasReady=()=>Boolean(retro||sheet||mageSheet);
function loadSheet(path,clean){return new Promise(resolve=>{const image=new Image();image.onload=()=>{
 try{const c=document.createElement('canvas');c.width=image.naturalWidth;c.height=image.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height);clean(pixels.data,c.width,c.height);ctx.putImageData(pixels,0,0);resolve(c);}
 catch(error){console.warn('Sprite atlas unavailable; using classic art.',error);resolve(null);}
 };image.onerror=()=>resolve(null);image.src=new URL(path,import.meta.url).href;});}
export function loadAtlas(){
 if(pending)return pending;if(typeof Image==='undefined')return Promise.resolve(false);
 pending=loadEquipmentArt().then(()=>Promise.all([loadSheet('./assets/warrior-wolf-v1.webp',cleanSpriteMatte),loadSheet('./assets/mage-v1.webp',cleanGreenMatte),loadSheet('./assets/warrior-armors-v1.webp',cleanSpriteMatte),loadSheet('./assets/warrior-weapons-v1.webp',cleanSpriteMatte),loadSheet('./assets/warrior-heads-v1.png',cleanGreenMatte),loadSheet('./assets/warrior-retro-v1.png',cleanGreenMatte),loadSheet('./assets/mage-retro-v1.png',cleanGreenMatte),loadSheet('./assets/heads-retro-v1.png',cleanGreenMatte),loadSheet('./assets/archer-retro-v1.png',cleanSpriteMatte),loadSheet('./assets/necro-retro-v1.png',cleanGreenMatte),loadSheet('./assets/boxer-retro-v1.png',cleanGreenMatte),loadSheet('./assets/ninja-retro-v1.png',cleanGreenMatte),loadSheet('./assets/heads-ko-v1.png',cleanGreenMatte),loadSheet('./assets/knight-retro-v1.png',cleanGreenMatte),loadSheet('./assets/knight-shield-v1.png',cleanGreenMatte),loadSheet('./assets/monk-retro-v1.png',cleanGreenMatte),loadSheet('./assets/trooper-retro-v1.png',cleanGreenMatte),loadSheet('./assets/engineer-retro-v1.png',cleanGreenMatte),loadSheet('./assets/berserker-retro-v1.png',cleanGreenMatte),loadSheet('./assets/joker-retro-v1.png',cleanGreenMatte),loadSheet('./assets/alien-retro-v1.png',cleanSpriteMatte),loadSheet('./assets/alien-heads-v1.png',cleanSpriteMatte),...FAMILIARS.map(name=>loadSheet(`./assets/${name}-retro-v1.png`,name==='cat'||name==='raven'?cleanGreenMatte:()=>{}))])).then(([w,m,b,g,heads,rw,rm,rh,ra,rn,rb,ri,rk,rt,rs,rmonk,rtrooper,rengineer,rberserker,rjoker,ralien,ralienHeads,...pets])=>{try{familiars=prepareFamiliars(pets);}catch(error){console.warn("Familiar art unavailable",error);}if(rw&&rm&&rh&&g){try{retro=prepareRetro(rw,rm,rh,g,(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;},ra,rn,rb,ri,rk,rt,rs,rmonk,rtrooper,rengineer,rberserker,rjoker,ralien,ralienHeads);}catch(error){console.warn('Retro art unavailable',error);}}sheet=w;mageSheet=m;warriorBody=b;warriorWeapons=g;warriorHeads=heads;if(b&&heads){try{warriorBodies=prepareWarriorBodies(b,(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;});}catch(error){console.warn('Warrior identity unavailable',error);}}return Boolean(retro||w||m||b);});return pending;
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
function draw(ctx,frames,index,x,y,scale,flip,time,fallen,image=sheet){
 const [sx,sy,w,h,px,py]=frames[index];ctx.save();ctx.translate(x,y);ctx.scale(flip?-scale:scale,scale);
 // Attack cell extends above the next cell; clip away the neighbour's boot.
 if(frames===warriorFrames&&index===3){ctx.beginPath();ctx.moveTo(-px,-py);ctx.lineTo(w-px,-py);ctx.lineTo(w-px,260-sy-py);ctx.lineTo(1040-sx-px,260-sy-py);ctx.lineTo(1040-sx-px,h-py);ctx.lineTo(-px,h-py);ctx.closePath();ctx.clip();}
 const breathe=index===0&&!fallen?Math.sin(time*3)*1.4:0;
 ctx.imageSmoothingEnabled=false;ctx.drawImage(image,sx,sy,w,h,-px,-py+breathe,w,h);ctx.restore();
}
export function atlasWarrior(ctx,h,x,y,s,flip,time,fallen,pose){
 if(retro&&h.class===0){retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;}
 if(h.class===0&&warriorBody&&warriorWeapons){const custom=warriorBodies&&warriorHeads&&validAppearance(h.appearance);drawWarriorGear(ctx,custom?warriorBodies[appearanceOf(h).face]:warriorBody,warriorWeapons,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time,custom?warriorHeads:null);return true;}
 if(!sheet||h.class!==0||h.inventory[h.equipped[0]]?.id!==0)return false;
 const ground=y+27*s-(s*27-24)*(Number(fallen)||0),index=animationFrame(time,pose,fallen);
 draw(ctx,warriorFrames,index,x,ground,s*54/330,flip,time,fallen);return true;
}
export function atlasWolf(ctx,h,x,y,s,flip,time,action,state={}){
 if(!sheet||h.inventory[h.equipped[2]]?.id!==10)return false;
 const index=state.fallen?5:action?3:state.run?1+(Math.floor(time*12)%2):0;
 draw(ctx,wolfFrames,index,x,y+11*s,s*27/217,flip,time,state.fallen);return true;
}

const mageFrames=[[55,20,385,485,195,478],[545,20,410,483,235,478],[1060,20,430,483,245,478],[20,525,460,470,230,455],[555,530,430,462,230,450],[1024,815,500,172,250,163]];
export function atlasMage(ctx,h,x,y,s,flip,time,fallen,pose){
 if(retro&&h.class===2){retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;}
 if(!mageSheet||h.class!==2||h.inventory[h.equipped[0]]?.id!==3)return false;
 const ground=y+27*s-(s*27-24)*(Number(fallen)||0);
 draw(ctx,mageFrames,animationFrame(time,pose,fallen),x,ground,s*54/435,flip,time,fallen,mageSheet);return true;
}

export function atlasArcher(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==1||!retro?.hasArcher)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasNecro(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==10||!retro?.hasNecro)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasBoxer(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==12||!retro?.hasBoxer)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export const familiarStatus=()=>familiars?.ready??FAMILIARS.map(()=>false);
export function atlasFamiliar(...args){return familiars?.draw(...args)??false;}

export const koAtlasReady=()=>Boolean(retro?.hasKO);
export function atlasNinja(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==6||!retro?.hasNinja)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasKnight(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==4||!retro?.hasKnight)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasMonk(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==7||!retro?.hasMonk)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasTrooper(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==3||!retro?.hasTrooper)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasEngineer(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==8||!retro?.hasEngineer)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasBerserker(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==9||!retro?.hasBerserker)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasJoker(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==5||!retro?.hasJoker)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}

export function atlasAlien(ctx,h,x,y,s,flip,time,fallen,pose){
 if(h.class!==11||!retro?.hasAlien)return false;
 retro.draw(ctx,h,animationFrame(time,pose,fallen),x,y+27*s-(s*27-24)*(Number(fallen)||0),s,flip,time);return true;
}
