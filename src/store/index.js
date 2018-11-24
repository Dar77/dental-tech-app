// src/store/index.js
// redux store
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
//local storage ref: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

//save the state anytime the 'store state' changes
store.subscribe(() => {
	//pass the current state of the store to the saveState function
	saveState(store.getState());
});

export default store;