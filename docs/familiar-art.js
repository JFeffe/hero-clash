// Same familiar renderer for portraits, combat and equipment previews.
export const FAMILIARS = ['wolf','dog','cat','raven','fairy'];
export function familiarFrame(time,action=0,state={}) {
  if(state.fallen)return 5;
  if(state.hurt)return 4;
  if(state.run)return 1+Math.floor(time*10)%2;
  if(action)return 3;
  return 0;
}
export function prepareFamiliars(images) {
  const entries=images.map((image,index)=>{
    if(!image)return null;
    const {width,height}=image, pixels=image.getContext('2d').getImageData(0,0,width,height).data;
    const frames=[];
    for(let f=0;f<6;f++){
      // Some generated action silhouettes extend slightly past a nominal cell.
      const edges=f<3?[0,512,1024,1536]:index===3?[0,585,1024,1536]:index===1?[0,545,995,1536]:[0,545,1024,1536];
      const left=Math.round(edges[f%3]*width/1536),right=Math.round(edges[f%3+1]*width/1536);
      const top=Math.floor(f/3)*height/2,bottom=top+height/2;
      let x0=right,y0=bottom,x1=left,y1=top;
      for(let y=top;y<bottom;y++)for(let x=left;x<right;x++)if(pixels[(y*width+x)*4+3]>128){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x+1);y1=Math.max(y1,y+1);}
      if(x1<=x0||y1<=y0)throw new Error(`Empty familiar frame ${index}:${f}`);
      frames.push([x0,y0,x1-x0,y1-y0]);
    }
    return {image,frames,scale:[27,27,23,25,30][index]/frames[0][3]};
  });
  return {ready:entries.map(Boolean),draw(ctx,h,x,y,s,flip,time,action,state={}){
    const index=h.inventory[h.equipped[2]]?.id-10,entry=entries[index];
    if(!entry)return false;
    const f=familiarFrame(time,action,state),[sx,sy,w,hh]=entry.frames[f],scale=s*entry.scale;
    const hover=!state.fallen&&index>=3?Math.sin(time*5)*s*.8:0;
    ctx.save();ctx.imageSmoothingEnabled=false;ctx.translate(x,y+11*s+hover);ctx.scale(flip?-1:1,1);
    ctx.drawImage(entry.image,sx,sy,w,hh,-w*scale/2,-hh*scale,w*scale,hh*scale);ctx.restore();return true;
  }};
}
