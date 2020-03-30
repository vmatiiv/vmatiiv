
export const CACHE_KEY = '$$CACHED_STATE$$';

const persState = state =>{
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  }
  
  export const persist = store => next => action => {
    next(action);
    setTimeout(persState(store.getState()),500)
    // persistState(store.getState());
  };