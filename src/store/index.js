// src/store/index.js
// redux store
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
//local storage ref: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

// TODO ********************************************************************************************************************
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

//save the state anytime the 'store state' changes
store.subscribe(() => {
	//pass the current state of the store to the saveState function
	saveState(store.getState());
});
//

// TODO development only - to clear redux local storage remove all local storage references above
// need to clear state first to reset
//const store = createStore(rootReducer);
// clear local storage
// localStorage.clear();
export default store;