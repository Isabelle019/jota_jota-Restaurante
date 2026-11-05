(function(){
 const pages=[...document.querySelectorAll('.site-page')];
 const ids=new Set(pages.map(p=>p.id.substring(5)));
 const navs=[...document.querySelectorAll('.topbar nav a')];
 function show(){
  let route=decodeURIComponent(location.hash.replace(/^#\/?/,''));
  let [id,section]=route.split('/'); if(!ids.has(id))id='index';
  pages.forEach(p=>p.classList.toggle('current',p.id==='page-'+id));
  navs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#/'+id));
  document.title=(document.getElementById('page-'+id).dataset.title||'Início')+' | Jota Jota';
  const input=document.querySelector('#page-'+id+' input.search');
  if(input){input.value='';filter(input)}
  if(section){requestAnimationFrame(()=>{const target=document.querySelector('#page-'+id+' #'+CSS.escape(section));if(target)target.scrollIntoView({behavior:'smooth',block:'start'});});}
  else window.scrollTo({top:0,behavior:'instant'});
 }
 function filter(input){
  const scope=input.closest('.site-page');if(!scope)return;
  const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const query=norm(input.value);let count=0;
  scope.querySelectorAll('.menu-row').forEach(r=>{const ok=norm(r.textContent).includes(query);r.style.display=ok?'':'none';if(ok)count++});
  scope.querySelectorAll('.menu-block').forEach(b=>b.style.display=[...b.querySelectorAll('.menu-row')].some(r=>r.style.display!=='none')?'':'none');
  const empty=scope.querySelector('#empty');if(empty)empty.style.display=count?'none':'block';
 }
 document.querySelectorAll('input.search').forEach(i=>i.addEventListener('input',()=>filter(i)));
 document.querySelectorAll('.site-page a[href^="#sec"]').forEach(a=>{let p=a.closest('.site-page');a.href='#/'+p.id.slice(5)+'/'+a.getAttribute('href').slice(1)});
 window.addEventListener('hashchange',show);show();
 window.addEventListener('scroll',()=>document.querySelector('.backtop').classList.toggle('visible',window.scrollY>500),{passive:true});
})();