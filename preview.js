(function(){
  let index=0; const listeners=new Set();
  const engine={getState:()=>({index,mode:'preview'}),navigate(next){index=next;listeners.forEach(fn=>fn(this.getState()));},subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}};
  window.MGTourSkin.mount(engine,window.MGTourSkinConfig);
})();
