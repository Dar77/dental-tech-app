//localStorage.js
//ref: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

//function to load state
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

//function to save state
export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (error) {
		console.log(error, 'saveState error');
	}
};