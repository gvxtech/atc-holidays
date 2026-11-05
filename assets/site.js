
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
 if(toggle&&links)toggle.addEventListener('click',()=>{
  const isOpen=links.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(isOpen));
});
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 const form=document.querySelector('#enquiry-form');
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body=[...d.entries()].map(([k,v])=>`${k}: ${v}`).join('%0A');location.href=`mailto:hello@example.com?subject=Website Enquiry&body=${body}`});

 const hero=document.querySelector('#destinationHero');
 if(!hero)return;
 const destinations=[
  {name:'OOTTY',description:'Discover the soul of Tamilnadu, where emerald hills meet peaceful Lands. Explore beautiful landscapes, experience local culture and make memories that stay with you.',url:'packages.html'},
  {name:'MUNNAR',description:'Escape to Munnar, an land of tea hills, lush rice terraces and timeless culture. Discover hidden corners, peaceful retreats and unforgettable island experiences.',url:'packages.html'},
  {name:'ALAPPY',description:'Experience Alappy with its back waters, beautiful houseboats, golden sun rise and welcoming culture. Find the perfect balance of adventure and relaxation.',url:'package-detail.html'},
  {name:'COORG',description:'Step into India’s rich heritage and discover magnificent architecture, colourful markets and stories that have travelled through generations.',url:'packages.html'}
 ];
 const cards=[...hero.querySelectorAll('.destination-card')],bgs=[...hero.querySelectorAll('.destination-bg')];
 const title=document.querySelector('#destinationTitle'),desc=document.querySelector('#destinationDescription');
 const number=document.querySelector('#currentNumber'),progress=hero.querySelector('.progress-fill');
 const explore=document.querySelector('#destinationExplore');
 let active=0;
 function show(i){
  active=(i+destinations.length)%destinations.length;
  const d=destinations[active];
  title.classList.add('changing');desc.classList.add('changing');
  setTimeout(()=>{
   title.textContent=d.name;desc.textContent=d.description;number.textContent=String(active+1).padStart(2,'0');explore.href=d.url;
   title.classList.remove('changing');desc.classList.remove('changing');
  },220);
  cards.forEach((card,n)=>{
   card.classList.toggle('active',n===active);
   card.classList.remove('pop-in');
   if(n===active){void card.offsetWidth;card.classList.add('pop-in')}
  });
  bgs.forEach((bg,n)=>bg.classList.toggle('active',n===active));
  progress.style.width=((active+1)/destinations.length*100)+'%';
 }
 show(0);
 // Automatic only: cards pop forward and the full banner changes every 5.2 seconds.
 setInterval(()=>show(active+1),3200);
});

// Premium page interactions: scroll reveals, sticky navigation and reading progress.
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.site-header');
 const progress=document.querySelector('.page-progress');
 const updateScroll=()=>{const y=window.scrollY; if(header)header.classList.toggle('scrolled',y>35); if(progress){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?y/max*100:0)+'%';}};
 updateScroll();window.addEventListener('scroll',updateScroll,{passive:true});
 const targets=document.querySelectorAll('main section, .page-hero, footer .footer-grid, .card, .split > *');
 targets.forEach(el=>el.classList.add('reveal'));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});targets.forEach(el=>observer.observe(el));}else targets.forEach(el=>el.classList.add('visible'));
 const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('current-page')});
});
