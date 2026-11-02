(() => {
  const stage=document.getElementById('orbitSkillsStage');
  if(!stage)return;
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
  const ringConfig=[
    {count:6,radius:18,duration:48,tilt:62,yaw:-8,direction:'normal',size:46},
    {count:7,radius:28,duration:62,tilt:62,yaw:7,direction:'reverse',size:43},
    {count:6,radius:38,duration:76,tilt:62,yaw:-5,direction:'normal',size:40},
    {count:6,radius:48,duration:90,tilt:62,yaw:4,direction:'reverse',size:37}
  ];
  let cursor=0;
  ringConfig.forEach((cfg,ringIndex)=>{
    const ring=document.createElement('div');
    ring.className='orbit-ring';
    ring.style.cssText=`width:${cfg.radius*2}%;height:${cfg.radius*2}%;--duration:${cfg.duration}s;--direction:${cfg.direction};--tilt:${cfg.tilt}deg;--yaw:${cfg.yaw}deg`;
    for(let i=0;i<cfg.count&&cursor<skills.length;i++,cursor++){
      const skill=skills[cursor],angle=(-90+i*360/cfg.count)*Math.PI/180;
      const item=document.createElement('div');item.className='orbit-item';
      item.style.cssText=`left:${50+Math.cos(angle)*50}%;top:${50+Math.sin(angle)*50}%;--badge:${cfg.size}px`;
      const badge=document.createElement('span');badge.className='orbit-logo';badge.tabIndex=0;badge.setAttribute('role','img');badge.setAttribute('aria-label',skill.name);badge.style.setProperty('--duration',cfg.duration+'s');badge.style.setProperty('--direction',cfg.direction);badge.style.setProperty('--accent',skill.color);
      if(skill.slug){
        const img=document.createElement('img');img.alt='';img.loading='lazy';img.src='https://cdn.simpleicons.org/'+skill.slug;
        img.onerror=()=>{img.remove();const fallback=document.createElement('span');fallback.className='orbit-fallback';fallback.textContent=skill.abbr;badge.appendChild(fallback)};
        badge.appendChild(img);
      }else{const fallback=document.createElement('span');fallback.className='orbit-fallback';fallback.textContent=skill.abbr;badge.appendChild(fallback)}
      badge.dataset.name=skill.name;badge.dataset.group=skill.group;
      item.appendChild(badge);ring.appendChild(item);
    }
    stage.appendChild(ring);
  });
  const tip=document.createElement('div');tip.className='orbit-tip';document.body.appendChild(tip);
  function show(el){tip.textContent=el.dataset.name+' · '+el.dataset.group;const r=el.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,r.left+r.width/2-tip.offsetWidth/2))+'px';tip.style.top=Math.max(8,r.top-tip.offsetHeight-10)+'px';tip.classList.add('show')}
  function hide(){tip.classList.remove('show')}
  stage.addEventListener('pointerover',e=>{const el=e.target.closest('.orbit-logo');if(el)show(el)});
  stage.addEventListener('pointerout',e=>{if(e.target.closest('.orbit-logo'))hide()});
  stage.addEventListener('focusin',e=>{const el=e.target.closest('.orbit-logo');if(el)show(el)});
  stage.addEventListener('focusout',hide);
  addEventListener('scroll',hide,{passive:true});
})();