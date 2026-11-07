/* Resume on phones/tablets: mobile browsers cannot show a PDF inside an <iframe>
   (Android shows nothing, iOS shows only a cropped first page). Render the PDF to a
   canvas with PDF.js instead; tapping it opens the full PDF in the native viewer.
   Desktop keeps the original iframe. Any failure falls back to Open / Download buttons. */
(function(){
  var useCanvas=window.matchMedia('(max-width:900px), (pointer:coarse)').matches||document.documentElement.classList.contains('is-phone');
  var sheet=document.querySelector('.resume-sheet');
  var frame=sheet&&sheet.querySelector('iframe');
  if(!useCanvas||!sheet||!frame)return;

  var PDF_URL='assets/docs/Resume.pdf';
  var CDN='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  var pdfDoc=null,timer=0;

  function fallback(){
    sheet.classList.remove('is-pdfjs');
    sheet.innerHTML='<div class="resume-fallback"><p>Your browser can’t preview the PDF here. Open it in your PDF viewer or download it.</p>'
      +'<a class="button button--primary" href="'+PDF_URL+'" target="_blank" rel="noopener">Open resume ↗</a>'
      +'<a class="button" href="'+PDF_URL+'" download="Sameer-Patwardhan-Resume.pdf">Download PDF ↧</a></div>';
  }
  function loadScript(src){
    return new Promise(function(ok,fail){var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=fail;document.head.appendChild(s)});
  }
  function render(){
    if(!pdfDoc)return;
    pdfDoc.getPage(1).then(function(page){
      var width=sheet.clientWidth||window.innerWidth;
      var base=page.getViewport({scale:1});
      var scale=width/base.width;
      var dpr=Math.min(window.devicePixelRatio||1,3);
      var vp=page.getViewport({scale:scale*dpr});
      var canvas=sheet.querySelector('canvas');
      if(!canvas){
        canvas=document.createElement('canvas');
        var link=document.createElement('a');
        link.href=PDF_URL;link.target='_blank';link.rel='noopener';link.setAttribute('aria-label','Open the full resume PDF');
        link.appendChild(canvas);sheet.appendChild(link);
        var note=document.createElement('p');note.className='resume-note';
        note.textContent='TAP THE CV TO OPEN THE FULL PDF · PINCH TO ZOOM';
        sheet.parentNode.parentNode.appendChild(note);
      }
      canvas.width=Math.floor(vp.width);canvas.height=Math.floor(vp.height);
      canvas.style.width='100%';canvas.style.height='auto';
      return page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
    }).catch(fallback);
  }

  sheet.classList.add('is-pdfjs');
  loadScript(CDN+'pdf.min.js').then(function(){
    window.pdfjsLib.GlobalWorkerOptions.workerSrc=CDN+'pdf.worker.min.js';
    return window.pdfjsLib.getDocument(PDF_URL).promise;
  }).then(function(doc){pdfDoc=doc;render()}).catch(fallback);

  function rerender(){clearTimeout(timer);timer=setTimeout(render,200)}
  window.addEventListener('resize',rerender);
  window.addEventListener('orientationchange',rerender);
})();
