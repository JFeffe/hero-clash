import {appearanceOf} from './appearance.js?v=0.26.0';

// Atlas-space sockets; heads rotate with the hurt/fallen pose, not the screen.
export const HEAD_SOCKETS=[
 [[146,76,0,68],[451,92,0,68],[704,94,0,68],[908,79,0,62],[1143,83,-.48,64],[1333,250,-Math.PI/2,60]],
 [[145,347,0,64],[448,355,0,64],[704,357,0,64],[906,346,0,61],[1140,349,-.48,64],[1333,511,-Math.PI/2,60]],
 [[144,609,0,63],[448,617,0,63],[704,620,0,63],[906,603,0,61],[1140,607,-.48,63],[1333,768,-Math.PI/2,59]],
 [[141,854,0,54],[445,861,0,55],[700,863,0,55],[903,853,0,53],[1137,857,-.48,55],[1330,997,-Math.PI/2,48]]
];
const headMasks=[
 [[109,7,180,78],[416,21,483,94],[668,24,737,96],[870,21,941,79],[1085,20,1165,80],[1263,216,1331,279]],
 [[109,282,178,348],[415,288,481,357],[669,288,738,359],[869,289,939,347],[1081,290,1161,346],[1264,478,1331,541]],
 [[108,542,177,610],[414,549,481,619],[669,552,738,622],[870,545,939,604],[1081,549,1161,604],[1264,735,1331,799]],
 [[107,801,174,855],[414,805,477,863],[666,808,733,865],[868,802,935,854],[1080,804,1157,853],[1264,965,1328,1023]]
];
// Only exposed upper arms and hands may be tinted; never the gold or cloak.
const skinRegions=[
 [[50,94,43,27],[175,118,21,36],[353,89,43,29],[628,100,38,29],[850,84,29,24],[1094,106,40,25],[1198,48,44,48],[1420,245,40,28]],
 [[51,379,32,22],[177,397,19,31],[352,370,45,39],[625,373,44,38],[882,347,43,24],[1093,378,36,28],[1200,310,44,48],[1362,515,37,26]],
 [[51,639,34,23],[175,654,22,35],[347,633,42,30],[623,637,40,34],[881,607,46,28],[1092,638,36,28],[1200,568,45,48],[1362,773,36,25]],
 []
];
export function prepareWarriorBodies(body,makeCanvas){
 return [0,1,2].map(tone=>{
  const c=makeCanvas(body.width,body.height),ctx=c.getContext('2d');ctx.drawImage(body,0,0);
  if(tone){const p=ctx.getImageData(0,0,c.width,c.height),d=p.data;
   for(const regions of skinRegions)for(const [x,y,w,h] of regions)for(let py=y;py<y+h;py++)for(let px=x;px<x+w;px++){
    const i=(py*c.width+px)*4,r=d[i],g=d[i+1],b=d[i+2];
    if(d[i+3]&&r>90&&g>45&&r>g*1.15&&g>b*1.12&&r-g<135){
     const factors=tone===1?[.77,.64,.57]:[.55,.42,.36];
     d[i]=r*factors[0];d[i+1]=g*factors[1];d[i+2]=b*factors[2];
    }
   }ctx.putImageData(p,0,0);
  }
  ctx.globalCompositeOperation='destination-out';
  for(const row of headMasks)row.forEach(([x,y,r,b],index)=>{
   ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(r,y);
   if(index===5){ctx.lineTo(r,b);ctx.lineTo(x,b);}
   else{ctx.lineTo(r,b-12);ctx.lineTo(r-12,b);ctx.lineTo(x+(r-x)*.52,b);ctx.lineTo(x+(r-x)*.22,b-14);ctx.lineTo(x,b-28);}
   ctx.closePath();ctx.fill();
  });ctx.globalCompositeOperation='source-over';
  return c;
 });
}
// Chin/neck anchors measured on the generated sheet, independent of hair extent.
const anchors=[
 [[146,221],[415,221],[708,221],[973,221]],
 [[146,458],[415,458],[708,458],[973,458]],
 [[146,699],[415,699],[708,699],[973,699]],
 [[146,940],[415,940],[708,940],[973,940]],
 [[146,1180],[415,1180],[708,1180],[973,1180]],
 [[146,1419],[415,1419],[708,1419],[973,1419]]
];
export function drawWarriorHead(ctx,heads,h,armor,index,pivot,baseline){
 const a=appearanceOf(h),row=a.gender*3+a.face,col=a.hair;
 const [x,y,angle,height]=HEAD_SOCKETS[armor][index],cellW=heads.width/4,cellH=heads.height/6;
 const [ax,ay]=anchors[row][col],k=height/205;
 ctx.save();ctx.translate(x-pivot,y-baseline);ctx.rotate(angle);ctx.scale(k,k);
 ctx.drawImage(heads,col*cellW,row*cellH,cellW,cellH,col*cellW-ax,row*cellH-ay,cellW,cellH);ctx.restore();
}
