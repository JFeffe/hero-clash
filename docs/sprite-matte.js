// Remove the magenta key and its dark antialiased fringe once, during loading.
// Only boundary pixels are despilled; interior costume/fur colours stay untouched.
export function cleanSpriteMatte(data,width,height){
 const background=new Uint8Array(width*height);
 for(let p=0;p<background.length;p++){
  const i=p*4,r=data[i],g=data[i+1],b=data[i+2];
  if(data[i+3]===0||(r-g>45&&b-g>45))background[p]=1;
 }
 for(let p=0;p<background.length;p++){
  const i=p*4;if(background[p]){data[i+3]=0;continue;}
  const r=data[i],g=data[i+1],b=data[i+2];
  // Warm reds (hair, cloak, leather) are not spill.
  if(r-g<=8||b-g<=8||b<r*.55)continue;
  const x=p%width,y=Math.floor(p/width);let boundary=false;
  for(let dy=-2;dy<=2&&!boundary;dy++)for(let dx=-2;dx<=2;dx++){
   const nx=x+dx,ny=y+dy;if(nx>=0&&nx<width&&ny>=0&&ny<height&&background[ny*width+nx]){boundary=true;break;}
  }
  if(!boundary)continue;
  const spill=Math.min(r,b)-g;
  if(spill>25)data[i+3]=0;
  else{data[i]=Math.min(r,g+6);data[i+2]=Math.min(b,g+6);}
 }
 return data;
}
