(function(){
 const trigger=document.getElementById('orbitTrigger');
 const overlay=document.getElementById('orbitOverlay');
 const fan=document.getElementById('fan');
 const close=document.getElementById('orbitClose');
 if(!trigger||!overlay||!fan||!close)return;
 const links=fan.querySelectorAll('a');
 function openMenu(){
   overlay.classList.add('is-open');
   fan.classList.add('open');
   overlay.setAttribute('aria-hidden','false');
   trigger.setAttribute('aria-expanded','true');
   document.body.classList.add('orbit-menu-open');
   close.focus();
 }
 function closeMenu(){
   overlay.classList.remove('is-open');
   fan.classList.remove('open');
   overlay.setAttribute('aria-hidden','true');
   trigger.setAttribute('aria-expanded','false');
   document.body.classList.remove('orbit-menu-open');
   trigger.focus();
 }
 trigger.addEventListener('click',openMenu);
 close.addEventListener('click',closeMenu);
 overlay.addEventListener('click',function(event){if(event.target===overlay)closeMenu()});
 document.addEventListener('keydown',function(event){
   if(event.key==='Escape'&&overlay.classList.contains('is-open'))closeMenu();
 });
 links.forEach(function(link){
   link.addEventListener('click',function(){
     overlay.classList.remove('is-open');
     fan.classList.remove('open');
     overlay.setAttribute('aria-hidden','true');
     trigger.setAttribute('aria-expanded','false');
     document.body.classList.remove('orbit-menu-open');
   });
 });
})();