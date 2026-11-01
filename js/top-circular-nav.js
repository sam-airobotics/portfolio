(function(){
 const trigger=document.getElementById('topnavTrigger'),overlay=document.getElementById('topnavOverlay'),fan=document.getElementById('topnavFan'),close=document.getElementById('topnavClose');
 if(!trigger||!overlay||!fan||!close)return;
 function setOpen(open){
  fan.classList.toggle('open',open);overlay.classList.toggle('is-open',open);
  overlay.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('topnav-open',open);
  if(open)close.focus();else trigger.focus();
 }
 trigger.addEventListener('click',()=>setOpen(!overlay.classList.contains('is-open')));
 close.addEventListener('click',()=>setOpen(false));
 overlay.addEventListener('click',e=>{if(e.target===overlay)setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('is-open'))setOpen(false)});
 fan.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
})();