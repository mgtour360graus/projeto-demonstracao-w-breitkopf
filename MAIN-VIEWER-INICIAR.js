/* W. Breitkopf Rio do Sul — ponte candidata 1.0.0
 * Aplicar somente à CÓPIA da exportação após aprovação visual.
 * Colar na ação JavaScript de inicialização do Main Viewer (GENERAL/MOBILE).
 * A ordem da playlist real deve ser mapeada em config.js: nativeIndex.
 * Este arquivo não modifica nem substitui o index original do 3DVista.
 */
(function(tour){'use strict';
 const key='__mgWBreitkopfBridge';
 if(window[key]){window[key].attach(tour);return;}
 const base=new URL('./mg-tour-skin/',document.baseURI).href;
 let currentTour=tour,timer=null,stopped=false,lastIndex=-2,skin=null;
 const listeners=new Set();
 function playlist(){if(!currentTour||!currentTour.mainPlayList)throw Error('mainPlayList indisponível. Conferir o contexto do Main Viewer.');return currentTour.mainPlayList;}
 function getState(){const nativeIndex=Number(playlist().get('selectedIndex'));return {mode:'3dvista',nativeIndex,index:window.MGTourSkinConfig.scenes.findIndex(s=>Number.isInteger(s.nativeIndex)&&s.nativeIndex===nativeIndex)};}
 const engine={getState,navigate(index){const s=window.MGTourSkinConfig.scenes[index];if(!s||!Number.isInteger(s.nativeIndex))throw Error('Preencher nativeIndex com o índice confirmado da playlist real.');playlist().set('selectedIndex',s.nativeIndex);},subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}};
 function load(file){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL(file,base).href;script.onload=resolve;script.onerror=()=>reject(Error('Falha ao carregar '+file));document.head.append(script);});}
 function poll(){if(stopped)return;try{const s=getState();if(s.index!==lastIndex){lastIndex=s.index;listeners.forEach(fn=>fn(s));}}catch(e){console.warn('[MG Tour]',e.message);}timer=setTimeout(poll,400);}
 function pause(){stopped=true;clearTimeout(timer);}function resume(){if(stopped){stopped=false;poll();}}
 const bridge={attach(next){currentTour=next;},dispose(){pause();listeners.clear();skin?.dispose();window.removeEventListener('pagehide',pause);window.removeEventListener('pageshow',resume);delete window[key];}};window[key]=bridge;
 window.addEventListener('pagehide',pause);window.addEventListener('pageshow',resume);
 if(!document.querySelector('link[data-mg-wbreitkopf]')){const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('skin.css',base).href;css.dataset.mgWbreitkopf='true';document.head.append(css);}
 Promise.resolve().then(()=>window.MGTourSkinConfig?null:load('config.js')).then(()=>window.MGTourSkin?null:load('skin.js')).then(()=>{
  const scenes=window.MGTourSkinConfig.scenes;const indices=scenes.map(s=>s.nativeIndex);
  if(indices.some(i=>!Number.isInteger(i)||i<0)||new Set(indices).size!==indices.length)throw Error('Mapeamento pendente ou duplicado: configure nativeIndex de todos os ambientes. A skin não será montada sobre o tour até corrigir o mapeamento.');
  const initial=getState();if(initial.index<0)throw Error('Panorama inicial não corresponde a um ambiente configurado.');
  skin=window.MGTourSkin.mount(engine,window.MGTourSkinConfig);poll();
 }).catch(error=>{bridge.dispose();console.error('[MG Tour] Integração pendente:',error.message);});
})(this);
