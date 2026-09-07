// Body poses and hand sockets share atlas coordinates. Equipment is selected by
// item ID, never inventory position or rarity, so existing saves work unchanged.
const rows=[[0,282,278],[283,543,540],[544,799,795],[800,1024,1018]];
const columns=[[0,255],[265,510],[522,765],[767,1023],[1030,1259],[1260,1536]];
const hands=[[[58,164],[347,163],[685,150],[994,70],[1120,165],[1430,263]],[[58,432],[355,432],[685,421],[995,337],[1118,432],[1430,523]],[[59,685],[354,686],[685,674],[992,597],[1120,685],[1430,781]],[[59,928],[353,928],[678,918],[993,841],[1120,932],[1420,1003]]];
const weapons=[// source rectangle, grip, displayed length relative to body height
 [170,0,175,500,256,402,.60], [715,0,120,502,775,340,.66],
 [1220,0,105,502,1257,260,.68], [195,512,115,490,254,805,.83],
 [705,512,130,480,770,896,.40], [1185,512,195,490,1280,870,.59]
];
export function warriorEquipment(h){
 const weapon=h.inventory?.[h.equipped?.[0]]?.id;
 const armor=h.inventory?.[h.equipped?.[1]]?.id;
 return {weapon:Number.isInteger(weapon)&&weapon>=0&&weapon<6?weapon:null,armor:armor>=6&&armor<=9?armor-6:2};
}
export function drawWarriorGear(ctx,body,gear,h,index,x,ground,s,flip,time=0){
 const {weapon,armor}=warriorEquipment(h),[top,bottom,baseline]=rows[armor], [left,right]=columns[index];
 const bodyHeight=baseline-top,scale=s*54/bodyHeight;
 const pivot=index===5?1398:(left+right)/2;
 const breathe=index===0?Math.sin(time*3)*1.4:0;
 ctx.save();ctx.translate(x,ground+breathe*scale);ctx.scale(flip?-scale:scale,scale);ctx.imageSmoothingEnabled=false;
 ctx.drawImage(body,left,top,right-left,bottom-top,left-pivot,top-baseline,right-left,bottom-top);
 if(weapon!==null){
  const [sx,sy,w,ht,gx,gy,length]=weapons[weapon];const [hx,hy]=hands[armor][index];
  let angle=weapon===0||weapon===4?2.12:weapon===1?.48:weapon===5?.35:.08;
  if(index===3)angle=weapon===2?.08:weapon===3?.65:Math.PI/2;
  if(index===5)angle=Math.PI/2;
  const k=bodyHeight*length/ht;
  ctx.save();ctx.translate(hx-pivot,hy-baseline);ctx.rotate(angle);ctx.scale(k,k);
  ctx.drawImage(gear,sx,sy,w,ht,sx-gx,sy-gy,w,ht);ctx.restore();
  // Reapply the actual glove over the grip, not a painted replacement hand.
  ctx.drawImage(body,hx-8,hy-7,16,14,hx-8-pivot,hy-7-baseline,16,14);
 }
 ctx.restore();
}
