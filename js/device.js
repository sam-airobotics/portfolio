/* Phone detection that does not depend on CSS pixel width.
   - Adds html.is-phone on small touch screens.
   - If a phone is being served the ~980px desktop layout ("Desktop site" mode), it re-asserts
     a device-width viewport and, if the browser still ignores it, shows a small dismissible notice. */
(function(){
  var d=document.documentElement;
  var touch=(navigator.maxTouchPoints||0)>0;
  if(!touch||screen.width>900)return;
  d.classList.add('is-phone');
  function wide(){return window.innerWidth>screen.width*1.4}
  if(!wide())return;
  d.classList.add('desktop-mode');
  var m=document.querySelector('meta[name="viewport"]');
  if(m)m.setAttribute('content','width=device-width, initial-scale=1, viewport-fit=cover');
  try{if(sessionStorage.getItem('dsk-notice'))return}catch(e){}
  window.addEventListener('load',function(){setTimeout(function(){
    if(!wide())return;
    var k=window.innerWidth/screen.width;
    var b=document.createElement('div');
    b.setAttribute('role','status');
    b.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;align-items:center;gap:'+(10*k)+'px;'
      +'padding:'+(12*k)+'px '+(14*k)+'px;background:#f4f7fb;color:#0b0f17;font:600 '+(13*k)+'px/1.35 system-ui,sans-serif;box-shadow:0 -4px 20px rgba(0,0,0,.5)';
    b.innerHTML='<span style="flex:1">You’re viewing the desktop layout. For the mobile version, open your browser menu (⋮) and turn off “Desktop site”.</span>'
      +'<button type="button" style="font:inherit;border:0;border-radius:'+(8*k)+'px;background:#0b0f17;color:#fff;padding:'+(8*k)+'px '+(14*k)+'px">OK</button>';
    b.querySelector('button').onclick=function(){b.remove();try{sessionStorage.setItem('dsk-notice','1')}catch(e){}};
    document.body.appendChild(b);
  },400)});
})();
