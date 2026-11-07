(() => {
  const stage=document.getElementById('orbitSkillsStage');
  const scene=document.getElementById('orbitSkillsScene');
  if(!stage||!scene||stage.dataset.ready)return;
  stage.dataset.ready='true';
  const skills=[
    {name:'ROS 2 Jazzy',slug:'ros',abbr:'ROS',group:'Robotics',color:'#e34f26'},
    {name:'Gazebo Harmonic',slug:'gazebo',abbr:'GZ',group:'Robotics',color:'#5aa6d1'},
    {name:'Nav2',abbr:'N2',group:'Robotics',color:'#4c9aff'},
    {name:'SLAM',abbr:'SL',group:'Robotics',color:'#8b5cf6'},
    {name:'URDF / Xacro',abbr:'URDF',group:'Robotics',color:'#22c55e'},
    {name:'MoveIt',slug:'moveit',abbr:'MV',group:'Robotics',color:'#ef4444'},
    {name:'Fusion 360',slug:'autodesk',abbr:'F360',group:'Mechanical',color:'#f97316'},
    {name:'SolidWorks',slug:'solidworks',abbr:'SW',group:'Mechanical',color:'#e11d48'},
    {name:'Ansys',slug:'ansys',abbr:'FEA',group:'Mechanical',color:'#f59e0b'},
    {name:'GD&T',abbr:'GD&T',group:'Mechanical',color:'#8b5cf6'},
    {name:'FEA',abbr:'FEA',group:'Mechanical',color:'#0ea5e9'},
    {name:'3D Printing',abbr:'3D',group:'Mechanical',color:'#14b8a6'},
    {name:'ESP32',slug:'espressif',abbr:'ESP',group:'Electronics',color:'#eab308'},
    {name:'STM32',slug:'stmicroelectronics',abbr:'STM',group:'Electronics',color:'#2563eb'},
    {name:'Arduino',slug:'arduino',abbr:'ARD',group:'Electronics',color:'#16a34a'},
    {name:'IMU',abbr:'IMU',group:'Electronics',color:'#06b6d4'},
    {name:'LiDAR',abbr:'LDR',group:'Electronics',color:'#a855f7'},
    {name:'RGB Camera',abbr:'CAM',group:'Electronics',color:'#ec4899'},
    {name:'C++',slug:'cplusplus',abbr:'C++',group:'Programming',color:'#2563eb'},
    {name:'Python',slug:'python',abbr:'PY',group:'Programming',color:'#eab308'},
    {name:'OpenCV',slug:'opencv',abbr:'CV',group:'Programming',color:'#22c55e'},
    {name:'Linux',slug:'linux',abbr:'LX',group:'Programming',color:'#facc15'},
    {name:'Git + GitHub',slug:'github',abbr:'GH',group:'Programming',color:'#f1f5f9'},
    {name:'Docker',slug:'docker',abbr:'DK',group:'Programming',color:'#2496ed'},
    {name:'MATLAB / Simulink',slug:'mathworks',abbr:'MAT',group:'Programming',color:'#f97316'}
  ];
  /* Four orbital planes, with the supplied template's different Z depths and tilt */
  const rings=[
    {size:30,count:4,badge:7,duration:80,direction:'normal',offset:20,tilt:62,yaw:0,z:150},
    {size:52,count:6,badge:6.4,duration:110,direction:'reverse',offset:70,tilt:58,yaw:-7,z:50},
    {size:74,count:7,badge:5.8,duration:140,direction:'normal',offset:10,tilt:66,yaw:6,z:-50},
    {size:96,count:8,badge:5.2,duration:170,direction:'reverse',offset:50,tilt:60,yaw:-4,z:-150}
  ];
  let cursor=0;
  const small=window.matchMedia('(max-width:760px)');
  rings.forEach(r=>{
    const ring=document.createElement('div');
    ring.className='orbit-ring';
    ring.style.cssText='width:'+r.size+'%;height:'+r.size+'%;left:'+((100-r.size)/2)+'%;top:'+((100-r.size)/2)+'%;--d:'+r.duration+'s;--dir:'+r.direction+';--t:'+r.tilt+'deg;--y:'+r.yaw+'deg;--z:'+r.z+'px';
    for(let i=0;i<r.count&&cursor<skills.length;i++,cursor++){
      const s=skills[cursor],a=(r.offset+i*360/r.count)*Math.PI/180;
      const item=document.createElement('div');
      item.className='orbit-item';
      item.style.left=(50+50*Math.cos(a))+'%';
      item.style.top=(50+50*Math.sin(a))+'%';
      item.dataset.base=r.badge/r.size*100;
      item.style.setProperty('--sz',(item.dataset.base*(small.matches?1.55:1))+'%');
      const badge=document.createElement('button');
      badge.type='button';badge.className='orbit-logo';badge.setAttribute('aria-label',s.name);
      badge.style.cssText='--d:'+r.duration+'s;--rdir:'+r.direction+';--t:'+r.tilt+'deg;--y:'+r.yaw+'deg;--accent:'+s.color;
      if(s.slug){
        const img=document.createElement('img');img.alt='';img.loading='lazy';img.src='https://cdn.simpleicons.org/'+s.slug;
        img.onerror=()=>{img.remove();const span=document.createElement('span');span.className='orbit-fallback';span.textContent=s.abbr;badge.appendChild(span)};
        badge.appendChild(img);
      }else{const span=document.createElement('span');span.className='orbit-fallback';span.textContent=s.abbr;badge.appendChild(span)}
      badge.dataset.name=s.name;badge.dataset.group=s.group;
      item.appendChild(badge);ring.appendChild(item);
    }
    scene.appendChild(ring);
  });
  // phones: larger badges so logos are legible and tappable (rebuilt on rotate/resize)
  const applyScale=()=>scene.querySelectorAll('.orbit-item').forEach(it=>it.style.setProperty('--sz',(it.dataset.base*(small.matches?1.55:1))+'%'));
  small.addEventListener?small.addEventListener('change',applyScale):small.addListener(applyScale);
  const tip=document.createElement('div');tip.className='orbit-tip';document.body.appendChild(tip);
  let current=null,lastType='mouse',wasShown=null,hideT=0;
  stage.addEventListener('pointerdown',e=>{lastType=e.pointerType||'mouse';wasShown=current},true);
  addEventListener('keydown',()=>{lastType='key'},true);
  function showTip(b){
    current=b;tip.textContent=b.dataset.name+' · '+b.dataset.group;tip.style.setProperty('--accent',b.style.getPropertyValue('--accent'));
    const r=b.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;
    tip.style.left=Math.max(10,Math.min(innerWidth-w-10,r.left+r.width/2-w/2))+'px';
    tip.style.top=(r.top-h-12>8?r.top-h-12:r.bottom+12)+'px';tip.classList.add('show');
    clearTimeout(hideT);if(lastType==='touch')hideT=setTimeout(hideTip,3200);
  }
  function hideTip(){current=null;tip.classList.remove('show');stage.classList.remove('hold')}
  stage.addEventListener('pointerover',e=>{const b=e.target.closest('.orbit-logo');if(b&&b!==current&&e.pointerType!=='touch')showTip(b)});
  stage.addEventListener('pointerout',e=>{const b=e.target.closest('.orbit-logo');if(b&&!b.contains(e.relatedTarget))hideTip()});
  stage.addEventListener('focusin',e=>{const b=e.target.closest('.orbit-logo');if(b&&lastType!=='touch')showTip(b)});
  stage.addEventListener('focusout',hideTip);
  stage.addEventListener('click',e=>{const b=e.target.closest('.orbit-logo');if(!b){hideTip();return}if(e.pointerType==='touch'||lastType==='touch'){if(wasShown===b){hideTip()}else{stage.classList.add('hold');showTip(b)}}});
  addEventListener('scroll',hideTip,{passive:true});
  const hero=stage.closest('.skills');
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    scene.style.transform='rotateX('+(-y*8)+'deg) rotateY('+(x*11)+'deg)';
  });
  hero.addEventListener('pointerleave',()=>{scene.style.transform=''});
})();