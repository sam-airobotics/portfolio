(function(){
 const trigger=document.getElementById('orbitTrigger');
 const overlay=document.getElementById('orbitOverlay');
 const fan=document.getElementById('fan');
 const close=document.getElementById('orbitClose');
 if(!trigger||!overlay||!fan||!close)return;
 const links=fan.querySelectorAll('a');
 // Same query as css/mobile.css: on these layouts the black hole is not at the desktop-calibrated spot,
 // so the fan is anchored to the button's real position.
 const compact=window.matchMedia('(max-width:760px), (max-aspect-ratio:9/10), (max-height:500px)');

 function anchorFan(){
   if(!compact.matches){fan.style.removeProperty('--bh-x');fan.style.removeProperty('--bh-y');return}
   const r=trigger.getBoundingClientRect();
   const R=fan.offsetHeight||180;
   let cx=r.left+r.width/2, cy=r.top+r.height/2;
   const minX=R+6, maxX=window.innerWidth-R-6;
   cx = minX<=maxX ? Math.min(Math.max(cx,minX),maxX) : window.innerWidth/2; // keep the whole arc on screen
   cy = Math.max(cy,R+8);
   fan.style.setProperty('--bh-x',cx+'px');
   fan.style.setProperty('--bh-y',cy+'px');
 }
 function setOpen(open,focus){
   if(open)anchorFan();
   overlay.classList.toggle('is-open',open);
   fan.classList.toggle('open',open);
   overlay.setAttribute('aria-hidden',String(!open));
   trigger.setAttribute('aria-expanded',String(open));
   document.body.classList.toggle('orbit-menu-open',open);
   if(focus)(open?close:trigger).focus();
 }
 trigger.addEventListener('click',function(){setOpen(true,true)});
 close.addEventListener('click',function(){setOpen(false,true)});
 overlay.addEventListener('click',function(event){if(event.target===overlay)setOpen(false,true)});
 document.addEventListener('keydown',function(event){
   if(event.key==='Escape'&&overlay.classList.contains('is-open'))setOpen(false,true);
 });
 links.forEach(function(link){link.addEventListener('click',function(){setOpen(false,false)})});
 // rotating the phone / resizing while open: re-anchor
 window.addEventListener('resize',function(){if(overlay.classList.contains('is-open'))anchorFan()});
 // coming back with the browser Back button (bfcache) must not show an open menu
 window.addEventListener('pageshow',function(e){if(e.persisted)setOpen(false,false)});
})();
