(function(){'use strict';
const paths={
 vr:'M5 7h14a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2h-4l-4-4-4 4H4a2 2 0 0 1-2-2v-7a3 3 0 0 1 3-3zM8 11h.01M16 11h.01',
 sound:'M11 4 6 8H2v8h4l5 4zM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14',
 muted:'M11 4 6 8H2v8h4l5 4zM16 9l6 6M22 9l-6 6',
 music:'M9 18V5l12-3v13M9 9l12-3M9 18a3 3 0 1 1-3-3c1 0 3 1 3 3M21 15a3 3 0 1 1-3-3c1 0 3 1 3 3',
 menu:'M4 6h16M4 12h16M4 18h16',
 grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
 pin:'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
 info:'M12 16v-5M12 7h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 chat:'M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-5a9 9 0 1 1 16.6-4.5z M8 11h.01M12 11h.01M16 11h.01',
 truck:'M3 6h11v11H3zM14 10h4l3 4v3h-7 M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0M20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
 coffee:'M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 9h2a3 3 0 0 1 0 6h-2M7 3v2M11 2v3M3 22h15',
 chair:'M5 12V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6M3 12h3v5h12v-5h3v8H3zM5 20v2M19 20v2',
 parts:'m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M7 5.8l9 5',
 tool:'M14 6a5 5 0 0 0-6 6L2 18l4 4 6-6a5 5 0 0 0 6-6l-3 3-4-4z',
 key:'M14 3a7 7 0 0 0-6 10L2 19v3h4v-3h3l3-3a7 7 0 1 0 2-13zM17 7h.01',
 people:'M16 21v-3a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v3M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17 3a4 4 0 0 1 0 8M21 21v-3a4 4 0 0 0-3-3.8',
 parking:'M4 3h16v18H4zM9 17V7h4a3 3 0 0 1 0 6H9',
 collapse:'m6 9 6 6 6-6',expand:'m6 15 6-6 6 6',
 close:'M6 6l12 12M18 6 6 18',
 play:'m8 4 13 8-13 8z',pause:'M8 4v16M16 4v16',
 fullscreen:'M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5',
 search:'M16.5 16.5 22 22M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
 compass:'m16 8-3 5-5 3 3-5z M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 phone:'M7 3H3c-1 10 8 19 18 18v-4l-5-2-2 2a15 15 0 0 1-7-7l2-2z',
 globe:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M2 12h20M12 2a20 20 0 0 1 0 20 20 20 0 0 1 0-20',
 route:'M6 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6M18 23a3 3 0 1 1 0-6 3 3 0 0 1 0 6M6 7v4h12v6'
};
const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.info}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let mounted=null;
window.MGTourSkin={mount(engine,config){
 if(mounted)return mounted;
 const c=config, scenes=c.scenes;let state=engine.getState(),current=Number.isInteger(state.index)&&state.index>=0?state.index:0;
 const preview=state.mode==='preview';let trayCollapsed=false,panel=null,focusReturn=null,closing=false,slideTimer=null,activeLayer=0,toastTimer=null,captionTimer=null;
 const root=document.createElement('div');root.id='mg-tour-app';root.dataset.mode=state.mode;
 const asset=name=>c.inlineAssets?.[name]||new URL(name,c.assetBase).href;
 const photo=(s,cls='')=>`<div class="mg-photo ${cls}" data-sheet="${esc(asset(s.sheet))}" data-col="${s.col}" data-row="${s.row}" role="img" aria-label="${esc(s.name)} — imagem ilustrativa"></div>`;
 root.innerHTML=`${preview?'<div class="mg-scene" aria-label="Imagem ilustrativa do ambiente"><div class="mg-scene-layer mg-photo"></div><div class="mg-scene-layer mg-photo"></div><div class="mg-shade"></div></div>':''}
 <header class="mg-topbar mg-glass"><div class="mg-brand"><img src="${esc(asset(c.logo))}" alt="Volkswagen Caminhões e Ônibus"><div class="mg-brand-separator"></div><div><div class="mg-brand-name">${esc(c.title)}</div><small>Rio do Sul<span class="mg-unit-long"> · Santa Catarina</span></small></div></div><div class="mg-unit">${icon('pin')}<div>Uma nova forma de visitar<small>W. Breitkopf · Experiência 360°</small></div></div><div class="mg-top-actions"><button class="mg-button mg-primary" data-panel="contacts">${icon('chat')}Fale com a equipe</button><button class="mg-icon-button mg-sound-toggle" data-sound="true" aria-label="Ativar som" aria-pressed="false" title="Ativar som">${icon('muted')}</button><button class="mg-icon-button" data-panel="menu" aria-label="Abrir menu">${icon('menu')}</button></div></header>
 ${preview?`<button class="mg-preview-tag mg-pill" data-panel="about">${icon('info')}Proposta visual · Imagens ilustrativas</button>`:''}
 <nav class="mg-rail mg-glass" aria-label="Navegação principal"><button data-panel="scenes" aria-expanded="false">${icon('grid')}Ambientes</button><button data-panel="map" aria-expanded="false">${icon('pin')}Localização</button><button data-panel="contacts" aria-expanded="false">${icon('chat')}Contatos</button><span class="mg-rail-line"></span><button data-panel="about" aria-expanded="false">${icon('info')}Sobre</button></nav>
 <main class="mg-caption"><div class="mg-eyebrow">Conheça nossa unidade</div><h1 id="mg-scene-title"></h1><p id="mg-scene-description"></p><button class="mg-detail" data-panel="detail">${icon('info')}Conheça este ambiente</button></main>
 ${preview?'<div class="mg-hotspots" aria-label="Acessos sugeridos"></div>':''}
 <div class="mg-bottom"><div class="mg-tray-toggle-wrap"><button class="mg-tray-toggle mg-glass" aria-expanded="true" aria-controls="mg-environments-tray" aria-label="Recolher miniaturas">${icon('collapse')}<span>Recolher</span></button></div><div class="mg-tray-shell"><div class="mg-tray-clip"><section id="mg-environments-tray" class="mg-tray mg-glass" aria-label="Seleção de ambientes"><div class="mg-mobile-dock"><button class="mg-button mg-primary" data-panel="scenes">${icon('grid')}Ambientes</button><button class="mg-button" data-panel="detail">${icon('info')}Sobre o espaço</button></div><div class="mg-filmstrip" aria-label="Miniaturas dos ambientes">${scenes.map((s,i)=>`<button class="mg-thumb" data-scene="${i}" aria-label="Visitar ${esc(s.name)}" aria-current="${i===current}">${photo(s)}<span>${esc(s.short)}</span></button>`).join('')}</div></section></div></div><footer class="mg-footer"><span>${preview?'<span class="mg-desktop-footer">Prévia para aprovação · Rio do Sul</span><span class="mg-mobile-footer">Prévia · Imagens ilustrativas</span>':'W. Breitkopf · Rio do Sul'}</span><span class="mg-footer-hint">Escolha um ambiente e explore no seu ritmo.</span><span class="mg-brand-credit">por <b>MG TOUR</b> 360°</span></footer></div>
 <dialog class="mg-dialog" aria-labelledby="mg-dialog-title"><header class="mg-dialog-head"><div><small id="mg-dialog-eyebrow">W. Breitkopf · Rio do Sul</small><h2 id="mg-dialog-title"></h2></div><button class="mg-icon-button mg-close" aria-label="Fechar janela">${icon('close')}</button></header><div class="mg-dialog-body"></div></dialog><div class="mg-toast" role="status" hidden></div><div class="mg-live" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></div>`;
 const soundtrack=document.createElement('audio');soundtrack.src=asset(c.soundtrack);soundtrack.loop=true;soundtrack.preload='none';soundtrack.volume=.14;soundtrack.hidden=true;soundtrack.dataset.mgSoundtrack='true';root.append(soundtrack);
 document.body.append(root);
 const q=s=>root.querySelector(s),qa=s=>Array.from(root.querySelectorAll(s)),dialog=q('dialog'),body=q('.mg-dialog-body');
 // Dimensão definida evita o colapso de flex-basis:0% em painéis auto-height no iOS.
 // A área visível acompanha barras do navegador, teclado e mudança de orientação.
 const visualViewport=window.visualViewport;
 let viewportFrame=0;
 function updateModalViewport(){
  viewportFrame=0;
  if(visualViewport&&Math.abs(visualViewport.scale-1)>.05)return;
  const height=visualViewport?.height||window.innerHeight;
  if(!Number.isFinite(height)||height<=0)return;
  root.style.setProperty('--mg-panel-height',Math.round(height*.9)+'px');
  root.style.setProperty('--mg-panel-top',Math.round((visualViewport?.offsetTop||0)+height*.05)+'px');
 }
 function queueModalViewport(){if(!viewportFrame)viewportFrame=requestAnimationFrame(updateModalViewport);}
 window.addEventListener('resize',queueModalViewport);
 visualViewport?.addEventListener('resize',queueModalViewport);
 visualViewport?.addEventListener('scroll',queueModalViewport);
 updateModalViewport();
 const observer=new ResizeObserver(entries=>entries.forEach(({target})=>fit(target)));
 function fit(el){if(!el.dataset.sheet)return;const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const k=Math.max(w/627,h/418),tw=627*k,th=418*k;el.style.backgroundImage=`url("${el.dataset.sheet}")`;el.style.backgroundSize=`${1254*k}px ${1254*k}px`;el.style.backgroundPosition=`${(w-tw)/2-Number(el.dataset.col)*tw}px ${(h-th)/2-Number(el.dataset.row)*th}px`;}
 function observePhotos(scope=root){scope.querySelectorAll('[data-sheet]').forEach(el=>{fit(el);observer.observe(el);});}
 function clearBody(){body.querySelectorAll('[data-sheet]').forEach(el=>observer.unobserve(el));body.replaceChildren();}
 function setPhoto(el,s){el.dataset.sheet=asset(s.sheet);el.dataset.col=s.col;el.dataset.row=s.row;fit(el);observer.observe(el);}
 function showToast(message){clearTimeout(toastTimer);q('.mg-toast').textContent=message;q('.mg-toast').hidden=false;toastTimer=setTimeout(()=>q('.mg-toast').hidden=true,4500);}
 function revealCaption(){
  clearTimeout(captionTimer);
  const caption=q('.mg-caption');
  caption.classList.remove('is-hidden');caption.inert=false;caption.removeAttribute('aria-hidden');
  captionTimer=setTimeout(()=>{
   if(caption.contains(document.activeElement))q('[aria-label="Abrir menu"]').focus({preventScroll:true});
   caption.classList.add('is-hidden');caption.inert=true;caption.setAttribute('aria-hidden','true');
  },4000);
 }
 function renderScene(index,announce=true){current=index;const s=scenes[index];q('#mg-scene-title').textContent=s.name;q('#mg-scene-description').textContent=s.description;q('.mg-eyebrow').textContent=s.group+' · Rio do Sul';qa('[data-scene]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.scene)===index)));
  if(preview){const layers=qa('.mg-scene-layer');activeLayer=1-activeLayer;setPhoto(layers[activeLayer],s);layers[activeLayer].classList.add('is-current');layers[1-activeLayer].classList.remove('is-current');q('.mg-hotspots').innerHTML=s.links.map(i=>`<button class="mg-hotspot" data-scene="${i}" aria-label="Acessar ${esc(scenes[i].name)}"><span class="mg-orb">${icon(scenes[i].icon)}</span><span>${esc(scenes[i].short)}</span></button>`).join('');}
  revealCaption();
  if(announce)q('.mg-live').textContent='Ambiente selecionado: '+s.name;
  const thumb=q(`.mg-thumb[data-scene="${index}"]`),strip=q('.mg-filmstrip');if(thumb&&strip){const off=thumb.offsetLeft-strip.offsetLeft;if(off<strip.scrollLeft||off+thumb.offsetWidth>strip.scrollLeft+strip.clientWidth)strip.scrollTo({left:Math.max(0,off-12),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
 }
 function navigate(index){if(!scenes[index])return;try{engine.navigate(index);if(dialog.open)closePanel();}catch(error){showToast('Este ambiente ainda precisa ser conectado ao panorama correspondente.');console.warn('[MG Tour]',error.message);}}
 function stopGuide(){clearInterval(slideTimer);slideTimer=null;}
 const compactMode=matchMedia('(max-width:700px),(max-height:500px) and (max-width:1100px)');
 function syncTrayAccessibility(){q('.mg-tray-clip').inert=trayCollapsed&&!compactMode.matches;}
 function toggleTray(){trayCollapsed=!trayCollapsed;root.classList.toggle('mg-tray-collapsed',trayCollapsed);const b=q('.mg-tray-toggle');b.innerHTML=icon(trayCollapsed?'expand':'collapse')+'<span>'+(trayCollapsed?'Ambientes':'Recolher')+'</span>';b.setAttribute('aria-expanded',String(!trayCollapsed));b.setAttribute('aria-label',trayCollapsed?'Mostrar miniaturas':'Recolher miniaturas');syncTrayAccessibility();}
 compactMode.addEventListener('change',syncTrayAccessibility);
 function toggleSound(){if(!soundtrack.paused){soundtrack.pause();closePanel();showToast('Som mutado.');return;}soundtrack.play().then(()=>{closePanel();showToast('Trilha instrumental ativada · volume suave');}).catch(()=>showToast('Toque novamente para ativar o som neste navegador.'));}
 function toggleGuide(){if(slideTimer){stopGuide();return;}if(matchMedia('(prefers-reduced-motion:reduce)').matches)showToast('Visita guiada ativada, sem animações de transição.');slideTimer=setInterval(()=>navigate((current+1)%scenes.length),8000);}
 function closePanel(immediate=false){if(!dialog.open||closing)return;closing=true;dialog.classList.add('is-closing');const finish=()=>{dialog.close();dialog.classList.remove('is-closing');clearBody();panel=null;closing=false;qa('[data-panel][aria-expanded]').forEach(b=>b.setAttribute('aria-expanded','false'));const target=focusReturn&&focusReturn.isConnected&&!focusReturn.closest('[inert]')?focusReturn:q('[aria-label="Abrir menu"]');target.focus({preventScroll:true});};if(immediate||matchMedia('(prefers-reduced-motion:reduce)').matches)finish();else setTimeout(finish,280);}
 function sceneList(){body.innerHTML=`<label class="mg-search">${icon('search')}<input type="search" aria-label="Buscar ambiente" placeholder="Qual espaço você quer conhecer?"></label><div class="mg-filters" aria-label="Filtrar ambientes">${['Todos','Caminhões','Atendimento','Serviços'].map((g,i)=>`<button class="mg-filter" data-filter="${g}" aria-pressed="${i===0}">${g}</button>`).join('')}</div><div class="mg-scene-grid"></div><p class="mg-empty" hidden>Nenhum ambiente encontrado. Tente outro nome ou categoria.</p>`;let category='Todos';const input=body.querySelector('input');const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();function update(){const grid=body.querySelector('.mg-scene-grid');grid.querySelectorAll('[data-sheet]').forEach(el=>observer.unobserve(el));const term=normalize(input.value);const list=scenes.map((s,i)=>({s,i})).filter(({s})=>(category==='Todos'||s.group===category)&&normalize(s.name+' '+s.short+' '+s.group).includes(term));grid.innerHTML=list.map(({s,i})=>`<button class="mg-scene-card" data-scene="${i}" aria-current="${i===current}" aria-label="Visitar ${esc(s.name)}">${photo(s)}<span class="mg-card-copy"><b>${esc(s.name)}</b><small>${esc(s.group)}</small></span></button>`).join('');body.querySelector('.mg-empty').hidden=list.length>0;observePhotos(grid);}input.addEventListener('input',update);body.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;body.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();}));update();}
 function openPanel(name,trigger){stopGuide();if(closing)return;const already=dialog.open;if(!already)focusReturn=trigger||document.activeElement;panel=name;clearBody();dialog.classList.toggle('mg-map-dialog',name==='map');qa('[data-panel][aria-expanded]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.panel===name)));const titles={scenes:'Escolha seu próximo ambiente',map:'Encontre a W. Breitkopf',contacts:'Vamos conversar?',about:'Uma visita, novas possibilidades.',detail:scenes[current].name,menu:'Explore a W. Breitkopf',route:'Percurso da visita',vr:'Realidade virtual'};q('#mg-dialog-title').textContent=titles[name]||titles.menu;
  if(name==='scenes')sceneList();
  if(name==='map'){body.innerHTML=`<iframe class="mg-map-frame" title="Localização da W. Breitkopf Caminhões em Rio do Sul" allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe><div class="mg-map-caption"><p>${esc(c.address)}</p><a class="mg-button" href="${esc(c.directions)}" target="_blank" rel="noopener noreferrer">${icon('pin')}Abrir no Google Maps</a></div>`;body.querySelector('iframe').src=c.mapUrl;}
  if(name==='contacts'){body.innerHTML=`<p>Escolha o setor da unidade de Rio do Sul. O atendimento continua pelo WhatsApp.</p><div class="mg-contacts">${c.contacts.map(x=>`<a class="mg-contact-card" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${icon(x.icon)}<div><b>${esc(x.name)}</b><small>${esc(x.description)}</small></div><strong>${esc(x.phone)}</strong></a>`).join('')}</div><div class="mg-contact-foot"><a class="mg-button" href="${c.telephone.href}">${icon('phone')}${c.telephone.label}</a><span>${esc(c.hours)}</span></div><div class="mg-socials">${c.socials.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${s.name}</a>`).join('')}</div>`;}
  if(name==='detail'){const s=scenes[current],ct=c.contacts[s.contact];body.innerHTML=`${photo(s,'mg-info-photo')}<h3 class="mg-detail-tagline">${esc(s.tag)}</h3><p>${esc(s.description)}</p><p>${esc(s.detail)}</p><a class="mg-button mg-primary" href="${ct.url}" target="_blank" rel="noopener noreferrer">${icon('chat')}Falar com ${ct.name.toLowerCase()}</a>${preview?'<p class="mg-note">Imagem ilustrativa para aprovação do layout. Os panoramas reais e os trajetos da unidade serão incorporados na etapa de produção.</p>':''}`;}
  if(name==='about'){body.innerHTML=`<div class="mg-about-logo"><img src="${esc(asset(c.logo))}" alt="Volkswagen Caminhões e Ônibus"><div><b>W.Breitkopf</b><span>Rio do Sul · Santa Catarina</span></div></div><p>Dos caminhões aos espaços de atendimento, uma experiência criada para aproximar você da concessionária.</p><p>Escolha um ambiente, descubra os detalhes e converse com a equipe de Rio do Sul quando quiser.</p><a class="mg-button" href="${esc(c.website)}" target="_blank" rel="noopener noreferrer">${icon('globe')}Visite o site da W. Breitkopf</a>${preview?'<p class="mg-note"><b>Proposta visual para aprovação.</b> As imagens demonstram a interface e não são panoramas 360° reais da unidade. Nomes e ambientes seguem o briefing. A navegação final será conectada aos panoramas do projeto 3DVista.</p>':''}`;}
  if(name==='menu'){body.innerHTML=`<div class="mg-menu-list">${[['scenes','grid','Ambientes','Conheça os dez espaços'],['detail','info','Sobre este ambiente',scenes[current].name],['route','route','Percurso da visita','Veja a organização dos espaços'],['map','pin','Localização','Encontre a unidade'],['contacts','chat','Fale com a equipe','Vendas, peças e oficina'],['vr','vr','VR — Oculus / Meta Quest','Conheça a experiência imersiva'],['about','info','Sobre a experiência','Conheça a proposta']].map(([p,i,t,d])=>`<button data-panel="${p}"${p==='vr'?' class="mg-vr-mobile-only"':''}>${icon(i)}<span>${t}<small>${d}</small></span></button>`).join('')}<button data-sound="true">${icon('music')}<span>${soundtrack.paused?'Ativar trilha sonora':'Desativar trilha sonora'}<small>Instrumental animado · volume baixo</small></span></button><button class="mg-fullscreen" aria-label="Entrar em tela cheia">${icon('fullscreen')}<span>Tela cheia<small>Amplie a visualização quando disponível</small></span></button><button data-guide="true">${icon('play')}<span>Visita guiada<small>Percorra os ambientes automaticamente</small></span></button><a href="${c.website}" target="_blank" rel="noopener noreferrer">${icon('globe')}<span>Site oficial<small>W. Breitkopf Caminhões</small></span></a></div><label class="mg-audio-volume">Volume da trilha<input type="range" aria-label="Volume da trilha sonora" min="0" max="30" value="${Math.round(soundtrack.volume*100)}"></label>`;}
  if(name==='vr'){const ready=!preview&&c.vrUrl;body.innerHTML=`<div class="mg-vr-hero">${icon('vr')}<h3>Uma nova perspectiva.</h3><p>Oculus / Meta Quest</p></div><p>${ready?'Abra esta experiência no navegador do headset e entre no modo VR do tour.':'A experiência imersiva será ativada no tour 360° final, com os panoramas reais da unidade.'}</p><p>${ready?'Use o controle do headset para acessar os pontos de navegação.':'Nesta demonstração, você pode conhecer os ambientes e aprovar a interface pelo celular ou computador.'}</p>${ready?`<a class="mg-button mg-primary" href="${esc(c.vrUrl)}">${icon('vr')}Entrar em realidade virtual</a>`:'<button class="mg-button" disabled>VR disponível no tour final</button>'}`;}
  if(name==='route'){body.innerHTML=`<p>Escolha um setor para continuar a visita. A organização abaixo é um roteiro de navegação, sem representar a planta física da unidade.</p>${['Caminhões','Atendimento','Serviços'].map(g=>`<div class="mg-route-group">${g}</div><div class="mg-route">${scenes.map((s,i)=>({s,i})).filter(x=>x.s.group===g).map(({s,i})=>`<button data-scene="${i}" aria-current="${i===current}">${icon(s.icon)}<span>${esc(s.name)}<small>${esc(s.tag)}</small></span></button>`).join('')}</div>`).join('')}`;}
  updateModalViewport();observePhotos(body);if(!already)dialog.showModal();body.scrollTop=0;q('.mg-close').focus({preventScroll:true});
 }
 root.addEventListener('click',e=>{if(e.target.closest('.mg-tray-toggle')){toggleTray();return;}const nav=e.target.closest('[data-scene]');if(nav){stopGuide();navigate(Number(nav.dataset.scene));return;}const opener=e.target.closest('[data-panel]');if(opener){openPanel(opener.dataset.panel,opener);return;}if(e.target.closest('[data-sound]')){toggleSound();return;}if(e.target.closest('[data-guide]')){closePanel();toggleGuide();return;}if(e.target.closest('.mg-close'))closePanel();if(e.target.closest('.mg-guide'))toggleGuide();if(e.target.closest('.mg-fullscreen')){if(dialog.open)closePanel();if(!document.fullscreenEnabled){showToast('Use a opção de tela cheia do seu navegador.');return;}const action=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();Promise.resolve(action).catch(()=>showToast('A tela cheia não está disponível neste navegador.'));}});
 dialog.addEventListener('cancel',e=>{e.preventDefault();closePanel();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePanel();}});
 dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=Array.from(dialog.querySelectorAll('button,a,input,iframe,[tabindex]')).filter(el=>!el.disabled&&el.getClientRects().length);const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
 root.addEventListener('input',e=>{if(e.target.matches('.mg-audio-volume input'))soundtrack.volume=Number(e.target.value)/100;});
 function updateSoundButton(){const on=!soundtrack.paused&&!soundtrack.muted;q('.mg-sound-toggle').innerHTML=icon(on?'sound':'muted');q('.mg-sound-toggle').setAttribute('aria-label',on?'Mutar som':'Ativar som');q('.mg-sound-toggle').title=on?'Mutar som':'Ativar som';q('.mg-sound-toggle').setAttribute('aria-pressed',String(on));}
 soundtrack.addEventListener('play',updateSoundButton);soundtrack.addEventListener('pause',updateSoundButton);
 const onVisibility=()=>{if(document.hidden){stopGuide();soundtrack.pause();}};document.addEventListener('visibilitychange',onVisibility);
 const onFullscreen=()=>qa('.mg-fullscreen').forEach(b=>b.setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Entrar em tela cheia'));document.addEventListener('fullscreenchange',onFullscreen);
 const unsubscribe=engine.subscribe(s=>{if(Number.isInteger(s.index)&&scenes[s.index])renderScene(s.index);});
 observePhotos();renderScene(current,false);
 mounted={navigate,getState:()=>({index:current,panel,trayCollapsed,mode:state.mode}),dispose(){stopGuide();soundtrack.pause();soundtrack.removeAttribute('src');soundtrack.load();unsubscribe();observer.disconnect();clearTimeout(toastTimer);clearTimeout(captionTimer);cancelAnimationFrame(viewportFrame);compactMode.removeEventListener('change',syncTrayAccessibility);window.removeEventListener('resize',queueModalViewport);visualViewport?.removeEventListener('resize',queueModalViewport);visualViewport?.removeEventListener('scroll',queueModalViewport);document.removeEventListener('visibilitychange',onVisibility);document.removeEventListener('fullscreenchange',onFullscreen);root.remove();mounted=null;}};
 return mounted;
}};
})();
