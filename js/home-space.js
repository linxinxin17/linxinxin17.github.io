(async () => {
 'use strict';
 const scene = document.querySelector('.personal-space');
 if (!scene) return;
 // Gallery pages are the source of truth. Static homepage cards remain a fallback
 // when opened via file:// or when the gallery request is unavailable.
 const shelf=document.querySelector('.space-works');
 const mobile=matchMedia('(pointer:coarse)').matches;
 let previews={};
 if(mobile&&location.protocol!=='file:'){
  try{const response=await fetch('assets/space-previews/manifest.json');if(response.ok)previews=await response.json();}catch{}
 }
 function coverSource(src){
  const key=decodeURIComponent(new URL(src,location.href).pathname).replace(/^\//,'');
  return previews[key]||src;
 }
 const snapshotLinks=new Set([...shelf.querySelectorAll('a')].map(link=>link.getAttribute('href')));
 if(location.protocol!=='file:'){
  try{
   const parser=new DOMParser();
   const read=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('Portfolio source unavailable');return parser.parseFromString(await response.text(),'text/html');};
   const groups=await Promise.all(['art','digital','web'].map(async category=>{
    const url=new URL('pages/gallery/gallery-'+category+'.html',location.href),doc=await read(url);
    return Promise.all([...doc.querySelectorAll('.gallery-item')].map(async link=>{
     const href=new URL(link.getAttribute('href'),url),detail=await read(href);
     const year=Number(detail.querySelector('.project-meta')?.textContent.match(/(?:19|20)\d{2}/)?.[0]);
     if(!year)throw new Error('Project needs a year in project-meta');
     return {href:href.pathname.replace(/^\//,''),year,category,title:link.querySelector('img').alt,src:new URL(link.querySelector('img').getAttribute('src'),url).href};
    }));
   }));
   const items=groups.flat().sort((a,b)=>b.year-a.year||Number(snapshotLinks.has(a.href))-Number(snapshotLinks.has(b.href))),fragment=document.createDocumentFragment();
   const seen=new Set();
   items.forEach((item,index)=>{if(seen.has(item.href))return;seen.add(item.href);
    const card=document.createElement('a');card.className='space-work';card.href=item.href;card.dataset.year=item.year;card.dataset.category=item.category;
    const img=document.createElement('img');img.fetchPriority=index<3?'high':'auto';img.src=coverSource(item.src);img.alt=item.title;img.decoding='async';img.draggable=false;
    const caption=document.createElement('span');caption.className='space-caption';const title=document.createElement('span');title.className='space-work-title';title.textContent=item.title;
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');caption.append(title,arrow);card.append(img,caption);fragment.append(card);
   });
   if(items.length)shelf.replaceChildren(fragment);
  }catch(error){console.warn('Using the local portfolio snapshot:',error.message);}
 }
 const cards=[...shelf.querySelectorAll('.space-work')].sort((a,b)=>Number(b.dataset.year)-Number(a.dataset.year));
 cards.forEach(card=>{const img=card.querySelector('img');if(img.dataset.spaceSrc)img.src=coverSource(img.dataset.spaceSrc);});
 cards.forEach(card=>shelf.append(card));
 let row=0,slot=0,previousYear=null;
 const years=[];
 const placements=cards.map(card=>{
  const year=Number(card.dataset.year);
  if(year!==previousYear){if(slot){row++;slot=0;}years.push({year,row});previousYear=year;}
  const placement={row,side:slot===0?-1:1,year};
  slot++;if(slot===2){slot=0;row++;}return placement;
 });
 const maxTravel=Math.max(0,1400+placements.at(-1).row*1150-750);
 const roadEnd=-(maxTravel+10000);
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const pause = document.querySelector('#space-pause');
 const mode = document.querySelector('#space-mode');
 const reset = document.querySelector('#space-reset');
 const words = {
  en:{welcome:'Welcome to my space.',subtitle:'Art, perception & everything in between.',hint:'Scroll to walk · Drag to look · Click a work to enter',touch:'Drag to look · Spread / pinch to travel · Tap a work',list:'View list',space:'Enter space',pause:'Pause',resume:'Resume',reset:'Reset view'},
  zh:{welcome:'欢迎来到我的空间。',subtitle:'艺术、感知，以及其间的一切。',hint:'滚轮前进 / 后退 · 拖动转头 · 点击作品进入',touch:'单指转头 · 双指张开前进 / 捏合后退 · 点击作品进入',list:'列表浏览',space:'进入空间',pause:'暂停运动',resume:'继续运动',reset:'回到原点'},
  es:{welcome:'Bienvenidos a mi espacio.',subtitle:'Arte, percepción y todo lo que hay entre ambos.',hint:'Mueve para mirar · Arrastra para explorar · Desplázate para viajar',touch:'Arrastra para mirar · Separa / junta dos dedos para avanzar / retroceder · Toca una obra',list:'Ver lista',space:'Entrar al espacio',pause:'Pausar',resume:'Continuar',reset:'Reiniciar vista'}
 };
 let paused=motion.matches, list=motion.matches, yaw=0, targetYaw=0, tilt=0, targetTilt=0, travel=0, targetTravel=0, lookX=0,lookY=0,px=0,py=0,drag=null,dragged=false,frame=0,last=0;
 const world=document.querySelector('.space-works');
 const viewport=document.createElement('div');viewport.className='room-viewport';world.before(viewport);viewport.append(world);
 const welcome=document.querySelector('.space-welcome');
 world.prepend(welcome);
 years.forEach(({year,row})=>{
  const marker=document.createElement('div');marker.className='space-year';marker.textContent=String(year);marker.setAttribute('aria-label',String(year));
  marker.style.transform=`translate3d(-220px,397px,${-1750-row*1150}px) rotateX(90deg)`;
  world.append(marker);
 });
 const ground=document.createElement('canvas');ground.className='open-ground';ground.setAttribute('aria-hidden','true');viewport.before(ground);
 const groundContext=ground.getContext('2d');
 function drawGround(w,h,f,heading,pitch){
  if(!groundContext)return;
  const dpr=Math.min(devicePixelRatio||1,1.5);
  if(ground.width!==Math.round(w*dpr)||ground.height!==Math.round(h*dpr)){ground.width=Math.round(w*dpr);ground.height=Math.round(h*dpr);}
  const c=groundContext;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
  const cy=h*(w<700?.49:.46),horizon=cy+f*Math.tan(pitch),light=document.documentElement.dataset.theme==='light';
  const shade=c.createLinearGradient(0,Math.min(h-1,Math.max(0,horizon)),0,h);
  shade.addColorStop(0,light?'rgba(184,199,205,0)':'rgba(30,40,47,0)');shade.addColorStop(1,light?'rgba(160,176,184,.45)':'rgba(13,20,25,.75)');c.fillStyle=shade;c.fillRect(0,Math.max(0,horizon),w,h);
  const cos=Math.cos(heading),sin=Math.sin(heading),cp=Math.cos(pitch),sp=Math.sin(pitch);
  function camera(x,z){const zz=z+travel,xx=cos*x+sin*zz,depth=-sin*x+cos*zz;return [xx,cp*400-sp*depth,-(sp*400+cp*depth)];}
  function line(x1,z1,x2,z2){let a=camera(x1,z1),b=camera(x2,z2);if(a[2]<40&&b[2]<40)return;
   if(a[2]<40||b[2]<40){const p=a[2]<40?a:b,q=a[2]<40?b:a,t=(40-p[2])/(q[2]-p[2]);for(let i=0;i<3;i++)p[i]+=(q[i]-p[i])*t;}
   c.moveTo(w/2+f*a[0]/a[2],cy+f*a[1]/a[2]);c.lineTo(w/2+f*b[0]/b[2],cy+f*b[1]/b[2]);
  }
  const ink=c.createLinearGradient(0,Math.max(0,horizon),0,h);ink.addColorStop(0,'transparent');ink.addColorStop(.18,light?'rgba(70,90,100,.08)':'rgba(133,157,172,.05)');ink.addColorStop(1,light?'rgba(70,90,100,.2)':'rgba(133,157,172,.19)');
  c.strokeStyle=ink;c.lineWidth=.7;c.beginPath();
  for(let x=-16000;x<=16000;x+=550)line(x,2000,x,roadEnd);
  for(let z=1500;z>=roadEnd;z-=550)line(-16000,z,16000,z);
  c.stroke();
  c.strokeStyle=light?'rgba(79,105,120,.24)':'rgba(170,198,210,.25)';c.lineWidth=1;c.setLineDash([3,12]);c.beginPath();line(0,-1750,0,roadEnd);c.stroke();c.setLineDash([]);
 }
 const reflections=cards.map(card=>{const reflection=document.createElement('div');reflection.className='room-reflection';reflection.setAttribute('aria-hidden','true');const img=card.querySelector('img').cloneNode();img.alt='';reflection.append(img);world.append(reflection);return reflection;});
 cards.forEach(card=>{const front=document.createElement('div');front.className='room-art-front';while(card.firstChild)front.append(card.firstChild);card.append(front);const side=document.createElement('span');side.className='room-art-side';side.setAttribute('aria-hidden','true');const top=document.createElement('span');top.className='room-art-top';top.setAttribute('aria-hidden','true');const back=document.createElement('span');back.className='room-art-back';back.setAttribute('aria-hidden','true');card.append(side,top,back);});
 const exhibits = cards.map((card, i) => {
  const {row, side} = placements[i];
  const x = side * 640, z = -1400 - row * 1150, angle = -side * 24;
  const radians = angle * Math.PI / 180;
  return {
   card, x, z, sin: Math.sin(radians), cos: Math.cos(radians),
   front: card.querySelector('.room-art-front'), back: card.querySelector('.room-art-back'),
   title: card.querySelector('.space-work-title'), image: card.querySelector('img'),
   reflection: reflections[i],
   transform: `translate3d(${x-230}px, -250px, ${z}px) rotateY(${angle}deg)`,
   reflectionTransform: `translate3d(${x-230}px, 1050px, ${z}px) rotateY(${angle}deg) scaleY(-1)`
  };
 });
 function translate(){
  const lang=document.documentElement.lang.startsWith('zh')?'zh':document.documentElement.lang;
  const copy=words[lang]||words.en;
  document.querySelectorAll('[data-space-copy]').forEach(el=>el.textContent=copy[el.dataset.spaceCopy]);
  pause.textContent=copy[paused?'resume':'pause']; pause.setAttribute('aria-pressed',String(paused));
  mode.textContent=copy[list?'space':'list']; mode.setAttribute('aria-pressed',String(list));
  pause.hidden=list; reset.hidden=list;
  if(list)viewport.before(welcome);else world.prepend(welcome);
  scene.classList.toggle('motion-paused',paused||list);
  if(matchMedia('(pointer:coarse)').matches) document.querySelector('[data-space-copy="hint"]').textContent=copy.touch;
  exhibits.forEach(({card,title,image})=>{const text=typeof galleryTitles!=='undefined'?galleryTitles[card.getAttribute('href')]?.[lang]:null;if(text){title.textContent=text;image.alt=text;}});
  scene.setAttribute('aria-label',copy.welcome);
 }
 function render(now){
  frame=0; const dt=Math.min((now-last)/1000||0,0.05);last=now;
  if(!paused){const ease=1-Math.exp(-dt*7);yaw+=(targetYaw-yaw)*ease;tilt+=(targetTilt-tilt)*ease;travel+=(targetTravel-travel)*ease;px+=(lookX-px)*ease;py+=(lookY-py)*ease;}
  const moving=Math.abs(targetTilt-tilt)>.00005||Math.abs(targetYaw-yaw)>.00005||Math.abs(targetTravel-travel)>.03||Math.abs(lookX-px)>.0001||Math.abs(lookY-py)>.0001;
  const w=scene.clientWidth,f=Math.min(1000,w*.92);
  viewport.style.perspective=f+'px';
  welcome.style.visibility=list||travel<1200?'visible':'hidden';
  const heading=yaw+px*.17,pitch=Math.max(-.7,Math.min(.7,tilt+py*-.28));
  world.style.transform=list?'none':`translateZ(${f}px) rotateX(${pitch}rad) rotateY(${heading}rad) translateZ(${travel}px)`;
  const sinHeading=Math.sin(heading),cosHeading=Math.cos(heading);
  exhibits.forEach(({card,front,back,reflection,x,z,sin,cos,transform,reflectionTransform})=>{
   if(list){front.style.display='';back.style.display='';card.style.visibility='visible';card.style.transform='none';card.removeAttribute('aria-hidden');card.tabIndex=0;return;}
   // Resolve faces in world coordinates instead of relying on nested CSS
   // backface culling, which can drop the artwork layer during camera motion.
   const facing=-x*sin-(z+travel)*cos;
   const frontDisplay=facing>=12?'':'none',backDisplay=facing<=-12?'':'none';
   if(front.style.display!==frontDisplay)front.style.display=frontDisplay;
   if(back.style.display!==backDisplay)back.style.display=backDisplay;
   const distance=-(sinHeading*-x+cosHeading*(z+travel));
   // Keep the whole slab until it passes behind the camera. On touch devices,
   // also limit distant layers to keep the compositor's texture budget bounded.
   const visible=distance>-300&&(!mobile||Math.abs(z+travel)<8000);
   const visibility=visible?'visible':'hidden';
   if(card.style.visibility!==visibility){card.style.visibility=visibility;card.setAttribute('aria-hidden',String(!visible));card.tabIndex=visible?0:-1;}
   if(card.style.transform!==transform)card.style.transform=transform;
   const reflected=visible&&(!mobile||Math.abs(z+travel)<4000)?'visible':'hidden';
   if(reflection.style.visibility!==reflected)reflection.style.visibility=reflected;
   if(reflection.style.transform!==reflectionTransform)reflection.style.transform=reflectionTransform;
  });
  if(!list)drawGround(w,scene.clientHeight,f,heading,pitch);
  if(!paused&&!list&&!document.hidden&&moving)frame=requestAnimationFrame(render);
 }
 function wake(){if(!frame){last=performance.now();frame=requestAnimationFrame(render);}}
 function explore(){document.body.classList.add('exploring');}
 const touches = new Map();
 let pinchDistance = null, pinchGesture = false;
 function touchDistance(){
  const [a,b] = [...touches.values()];
  return a && b ? Math.hypot(a.x-b.x,a.y-b.y) : null;
 }
 // Touch capture stays on the scene even when a panel moves out of view.
 scene.addEventListener('pointerdown',e=>{
  if(list||e.button!==0||e.target.closest('button'))return;
  if(e.pointerType==='touch'){
   if(e.isPrimary)clearGesture();
   touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
   scene.setPointerCapture(e.pointerId);
   if(touches.size>1){
    e.preventDefault();release();dragged=true;pinchGesture=true;
    touches.forEach((_,id)=>scene.setPointerCapture(id));
    pinchDistance=touchDistance();return;
   }
   if(pinchGesture)return;
  }
  if(!e.isPrimary&&e.pointerType!=='touch')return;
  e.preventDefault();
  yaw=targetYaw=yaw+px*.17;tilt=targetTilt=Math.max(-.7,Math.min(.7,tilt-py*.28));lookX=lookY=px=py=0;
  const capture=e.pointerType==='touch'?scene:e.target.closest('.space-work')||scene;
  drag={x:e.clientX,y:e.clientY,yaw:targetYaw,tilt:targetTilt,id:e.pointerId,capture,link:e.target.closest('.space-work')};dragged=false;
  capture.setPointerCapture(e.pointerId);
 });
 scene.addEventListener('pointermove',e=>{
  if(list)return;
  if(e.pointerType==='touch'&&touches.has(e.pointerId)){
   touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(pinchGesture){
    e.preventDefault();
    const distance=touchDistance();
    if(distance>=8&&pinchDistance>=8){
     if(paused){paused=false;translate();}
     targetTravel=Math.max(0,Math.min(maxTravel,targetTravel+Math.log(distance/pinchDistance)*2200));
     explore();wake();
    }
    pinchDistance=distance;
    return;
   }
  }
  if(drag&&drag.id===e.pointerId){
   const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
   if(dragged||Math.hypot(dx,dy)>4){
    if(paused){paused=false;translate();}
    dragged=true;scene.classList.add('dragging');
    targetYaw=drag.yaw+dx*.004;targetTilt=Math.max(-.7,Math.min(.7,drag.tilt-dy*.0035));wake();
   }
  }else if(!paused&&e.pointerType!=='touch'){lookX=(e.clientX/scene.clientWidth-.5)*2;lookY=(e.clientY/scene.clientHeight-.5)*2;wake();}
 });
 function release(){
  const previous=drag;drag=null;scene.classList.remove('dragging');
  if(previous?.capture.hasPointerCapture(previous.id))previous.capture.releasePointerCapture(previous.id);
 }
 function endPointer(e){
  touches.delete(e.pointerId);
  if(pinchGesture){
   pinchDistance=touchDistance();
   if(touches.size<2){
    pinchGesture=false;
    const remaining=touches.entries().next().value;
    if(remaining){
     const [id,point]=remaining;
     // Rebase without a jump; the remaining finger can immediately look around.
     targetYaw=yaw;targetTilt=tilt;
     drag={x:point.x,y:point.y,yaw,tilt,id,capture:scene};
    }
   }
   return;
  }
  if(drag?.id===e.pointerId){
   const tap=e.pointerType==='touch'&&e.type==='pointerup'&&!dragged?drag.link:null;
   release();
   if(tap)tap.click();
  }
  if(e.type==='pointercancel')dragged=false;
 }
 function clearGesture(){
  const ids=[...touches.keys()];touches.clear();pinchDistance=null;pinchGesture=false;release();
  ids.forEach(id=>{if(scene.hasPointerCapture(id))scene.releasePointerCapture(id);});
 }
 window.addEventListener('pointerup',endPointer);
 window.addEventListener('pointercancel',endPointer);
 scene.addEventListener('lostpointercapture',e=>{
  if(scene.hasPointerCapture(e.pointerId))return;
  if(touches.has(e.pointerId))endPointer(e);
  else if(drag?.id===e.pointerId)release();
 });
 window.addEventListener('blur',clearGesture);
 scene.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);
 scene.addEventListener('dragstart',e=>e.preventDefault());
 scene.addEventListener('pointerleave',()=>{if(!drag){lookX=0;lookY=0;wake();}});
 cards.forEach(card=>card.draggable=false);
 scene.addEventListener('wheel',e=>{if(list||paused)return;e.preventDefault();targetYaw+=e.deltaX*.001;targetTravel=Math.max(0,Math.min(maxTravel,targetTravel+e.deltaY*1.8));explore();wake();},{passive:false});
 scene.addEventListener('keydown',e=>{if(paused||list)return;const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')targetYaw-=.18;if(e.key==='ArrowRight')targetYaw+=.18;if(e.key==='ArrowUp')targetTravel=Math.min(maxTravel,targetTravel+180);if(e.key==='ArrowDown')targetTravel=Math.max(0,targetTravel-180);explore();wake();});
 pause.addEventListener('click',()=>{paused=!paused;translate();wake();});
 reset.addEventListener('click',()=>{clearGesture();yaw=targetYaw=tilt=targetTilt=travel=targetTravel=lookX=lookY=px=py=0;document.body.classList.remove('exploring');wake();});
 mode.addEventListener('click',()=>{clearGesture();list=!list;document.body.classList.toggle('list-mode',list);translate();wake();});
 motion.addEventListener('change',e=>{paused=e.matches;list=e.matches;document.body.classList.toggle('list-mode',list);translate();wake();});
 document.addEventListener('visibilitychange',()=>{scene.classList.toggle('motion-paused',document.hidden||paused||list);if(document.hidden){clearGesture();cancelAnimationFrame(frame);frame=0;}else wake();});
 window.addEventListener('resize',wake);
 new MutationObserver(wake).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // Decode the entrance images before revealing their panels. Otherwise a cold
 // load can show empty dark faces while the browser is still decoding photos.
 await Promise.all(cards.slice(0,3).map(card=>card.querySelector('img').decode().catch(()=>{})));
 document.body.classList.add('space-ready');document.body.classList.toggle('list-mode',list);translate();wake();
})();
