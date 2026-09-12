import {cleanGreenMatte} from './sprite-matte.js';

// Shared item IDs are the visual identity. No per-class replacement sprites.
export const equipmentAssets={weapons:null,armors:null,objects:null};
export const WEAPON_SPRITES={
 19:{rect:[187,8,96,323],grip:[262,174],size:185},
 20:{rect:[416,86,335,189],grip:[580,191],size:143,horizontal:true},
 21:{rect:[901,10,110,314],grip:[959,239],size:113},
 22:{rect:[1221,114,180,201],grip:[1312,299],size:66},
 23:{rect:[176,345,94,309],grip:[211,599],size:153},
 24:{rect:[522,344,150,310],grip:[575,574],size:163},
 25:{rect:[939,346,41,309],grip:[959,500],size:205},
 26:{rect:[1184,425,125,176],grip:[1249,569],size:42,paired:true},
 27:{rect:[99,831,262,141],grip:[151,922],size:76,horizontal:true,paired:true},
 5:{rect:[502,668,154,320],grip:[576,914],size:160},
 2:{rect:[926,673,84,312],grip:[996,832],size:150},
 3:{rect:[1279,664,77,325],grip:[1315,864],size:192}
};
const objectIDs=[15,16,17,18,33,34];
export const OBJECT_COLORS={15:'#7ae5ec',16:'#bc9fff',17:'#99e5a4',18:'#ffc86c',33:'#f48d9b',34:'#b7a6ff'};
let pending;
// A narrow chroma key preserves the purple amulet and seal interior.
export function cleanEquipmentMagenta(data){for(let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];if(r>180&&b>180&&g<100&&Math.abs(r-b)<65)data[i+3]=0;}}
export function loadEquipmentArt(){if(pending)return pending;if(typeof Image==='undefined')return Promise.resolve(false);pending=Promise.all(Object.entries({weapons:'equipment-weapons-v1.png',armors:'equipment-armors-v1.png',objects:'equipment-familiars-objects-v1.png'}).map(([key,file])=>new Promise(resolve=>{const img=new Image();img.onload=()=>{try{const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);const p=ctx.getImageData(0,0,c.width,c.height);(key==='objects'?cleanEquipmentMagenta:cleanGreenMatte)(p.data,c.width,c.height);ctx.putImageData(p,0,0);equipmentAssets[key]=c;resolve(true);}catch{resolve(false);}};img.onerror=()=>resolve(false);img.src=new URL('./assets/'+file,import.meta.url).href;}))).then(results=>results.every(Boolean));return pending;}
export const newArmorRow=h=>{const id=h.inventory?.[h.equipped?.[1]]?.id;return id>=28&&id<=31?id-28:-1;};
export function drawNewWeapon(ctx,id,x,y,frame=0,offhand=null){const d=WEAPON_SPRITES[id],sheet=equipmentAssets.weapons;if(!d||!sheet)return false;const [sx,sy,w,h]=d.rect,k=d.size/(d.horizontal?w:h);let angle=d.horizontal?0:id===2||id===19?0:.10;if(frame===3&&!d.horizontal&&id!==2&&id!==19&&id!==22)angle=1.0;if(frame===4)angle-=.18;if(frame===5)angle=d.horizontal?-.12:Math.PI/2;
 function part(px,py,secondary=false){ctx.save();ctx.translate(px,py);ctx.rotate(angle);ctx.scale(k,k);ctx.drawImage(sheet,sx,sy,w,h,sx-d.grip[0],sy-d.grip[1],w,h);ctx.restore();}
 if(d.paired&&offhand)part(...offhand,true);part(x,y);return true;}
export function drawObjectIcon(ctx,id,x,y,size=20){const sheet=equipmentAssets.objects,col=objectIDs.indexOf(id);if(!sheet||col<0)return false;const cw=sheet.width/6,ch=sheet.height/2;ctx.drawImage(sheet,col*cw,ch,cw,ch,x-size/2,y-size/2,size,size);return true;}
export function drawHeldObject(ctx,h,x,y,frame=0){const id=h.inventory?.[h.equipped?.[3]]?.id;if(!objectIDs.includes(id))return false;ctx.save();ctx.translate(x,y);if(frame===5)ctx.rotate(-Math.PI/2);const magical=[16,17,33,34].includes(id);if(magical){ctx.fillStyle=OBJECT_COLORS[id]+'30';ctx.fillRect(-11,-10,22,22);}const ok=drawObjectIcon(ctx,id,0,0,magical?29:34);ctx.restore();return ok;}
export function drawObjectCombat(ctx,h,x,y,s,time,effects=[],side=0,reduced=false,fallen=false){const id=h.inventory?.[h.equipped?.[3]]?.id;if(!objectIDs.includes(id)||fallen)return;const color=OBJECT_COLORS[id];const relevant=effects.find(a=>time-a.started>=0&&time-a.started<.7&&((id===16&&a.kind==='null'&&a.target===side)||(id===17&&a.kind==='hit'&&a.critical&&a.target!==side)||(id===18&&['potion_up','potion_down'].includes(a.kind)&&a.target===side)||(id===15&&a.kind==='hit'&&a.target!==side)));const startPulse=[33,34].includes(id)&&time<1.2;const pulse=Boolean(relevant||startPulse);const age=relevant?time-relevant.started:time;ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.globalAlpha=pulse?.85:.22;ctx.beginPath();if(id===34||id===33)ctx.ellipse(x,y,21*s/3,7*s/3,0,0,Math.PI*2);else if(pulse)ctx.arc(x,y-20*s,12+(reduced?0:age*22),0,Math.PI*2);if(id===15&&pulse){ctx.moveTo(x-12,y-20*s);ctx.lineTo(x+12,y-20*s);ctx.moveTo(x,y-20*s-12);ctx.lineTo(x,y-20*s+12);}ctx.stroke();ctx.restore();}
export function drawTurtle(ctx,h,x,y,s=2,flip=false,time=0,action=0,state={}){if(h.inventory?.[h.equipped?.[2]]?.id!==32||!equipmentAssets.objects)return false;const sheet=equipmentAssets.objects,cw=sheet.width/6,ch=sheet.height/2,index=state.fallen?5:state.hurt?4:action?3:state.run?1+Math.floor(time*7)%2:0;const k=s*31/cw;ctx.save();ctx.imageSmoothingEnabled=false;ctx.translate(x,y+10*s);ctx.scale(flip?-k:k,k);ctx.drawImage(sheet,index*cw,0,cw,ch,-cw/2,-ch*.86,cw,ch);ctx.restore();return true;}

export function projectilePalette(h){const id=h.inventory?.[h.equipped?.[0]]?.id;return id===22?['#f3edff','#dac4ff','#b38aff','#855beb','#58359d']:id===3?['#edfbff','#bdefff','#79d7f6','#469bc5','#275b89']:['#fff3bb','#ffd172','#ffad52','#ed7748','#b14c49'];}
