(function(){
const stage=document.getElementById('projectStage'),ring=document.getElementById('projectRing');if(!stage||!ring)return;
const cards=[...ring.querySelectorAll('.ring-card')],count=cards.length,step=360/count;
const dialog=document.getElementById('projectInfoDialog'),close=document.getElementById('closeProjectInfo');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let angle=0,dragging=false,startX=0,lastX=0,moved=false,ignoreClick=false,lastPressedCard=null,lastTime=performance.now(),radius=0,velocity=0,snapTarget=null,lastInteraction=performance.now(),front=-1;
const dragFactor=.42,autoSpeed=reduced?0:2.2;
function render(){ring.style.transform='translateZ('+(-radius)+'px) rotateX(-9deg) rotateZ(-3deg) rotateY('+angle+'deg)';const i=Math.round((((-angle%360)+360)%360)/step)%count;if(i!==front){front=i;cards.forEach((c,n)=>c.classList.toggle('is-front',n===i));document.getElementById('ringCounter').textContent=String(i+1).padStart(2,'0')+' / '+String(count).padStart(2,'0')}}
function layout(){const w=cards[0].getBoundingClientRect().width||400;radius=(w/2)/Math.tan(Math.PI/count)*1.28;cards.forEach((c,i)=>{c.style.setProperty('--ring-angle',i*step+'deg');c.style.setProperty('--ring-radius',radius+'px')});render()}
function openInfo(c){if(!c)return;document.getElementById('dialogProjectTitle').textContent=c.dataset.title||'Project';document.getElementById('dialogProjectStatus').textContent=c.dataset.status||'PROJECT';document.getElementById('dialogProjectDescription').textContent=c.dataset.description||'';const tags=document.getElementById('dialogProjectTags');tags.replaceChildren(...(c.dataset.tags||'').split('|').filter(Boolean).map(t=>{const s=document.createElement('span');s.textContent=t;return s}));document.getElementById('dialogProjectRepo').href=c.dataset.repo||'#';if(typeof dialog.showModal==='function'){if(!dialog.open)dialog.showModal()}else{dialog.setAttribute('open','');dialog.style.display='block'}}
cards.forEach(c=>{c.setAttribute('href','#');c.removeAttribute('target');c.setAttribute('role','button');c.setAttribute('tabindex','0');c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openInfo(c)}})});
stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;lastPressedCard=e.target.closest('.ring-card');dragging=true;moved=false;ignoreClick=false;startX=lastX=e.clientX;velocity=0;snapTarget=null;lastInteraction=performance.now();stage.classList.add('is-dragging');try{stage.setPointerCapture(e.pointerId)}catch(_){}});
stage.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-lastX;if(Math.abs(e.clientX-startX)>7)moved=true;if(dx){angle+=dx*dragFactor;velocity=dx*dragFactor;lastInteraction=performance.now()}lastX=e.clientX;render()});
function end(e){if(!dragging)return;dragging=false;stage.classList.remove('is-dragging');ignoreClick=moved;lastInteraction=performance.now();try{stage.releasePointerCapture(e.pointerId)}catch(_){}}
stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
stage.addEventListener('click',e=>{const card=e.target.closest('.ring-card')||lastPressedCard;if(ignoreClick){ignoreClick=false;lastPressedCard=null;return}if(card){e.preventDefault();e.stopPropagation();openInfo(card)}lastPressedCard=null});
close.addEventListener('click',()=>{if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open')});
dialog.addEventListener('click',e=>{if(e.target===dialog&&typeof dialog.close==='function')dialog.close()});
stage.addEventListener('wheel',e=>{const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:(e.shiftKey?e.deltaY:0);if(d){e.preventDefault();angle-=d*.2;lastInteraction=performance.now();render()}},{passive:false});
function move(dir){snapTarget=(Math.round(angle/step)+dir)*step;velocity=0;lastInteraction=performance.now()}
document.getElementById('ringPrev').addEventListener('click',()=>move(1));document.getElementById('ringNext').addEventListener('click',()=>move(-1));
stage.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();move(-1)}else if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();move(1)}});
function tick(now){const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;if(!dragging){if(snapTarget!==null){angle+=(snapTarget-angle)*Math.min(1,dt*6);if(Math.abs(snapTarget-angle)<.08){angle=snapTarget;snapTarget=null}}else if(Math.abs(velocity)>.1){angle+=velocity;velocity*=.9}else if(!reduced&&now-lastInteraction>1200){angle+=autoSpeed*dt}}render();requestAnimationFrame(tick)}
window.addEventListener('resize',layout);layout();requestAnimationFrame(t=>{lastTime=t;tick(t)});
})();