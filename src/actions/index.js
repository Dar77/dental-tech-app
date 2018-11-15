// src/actions/index.js
// redux actions
// ref: https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import { ADD_ALLOY } from "../constants/action-types";
//It is a best pratice to wrap every action within a function. Such function is an action creator.
export const addAlloy = alloy => ({ type: "ADD_ALLOY", payload: alloy });
/* So, the type property is nothing more than a string.
The reducer will use that string to determine how to calculate the next state.
Since strings are prone to typos and duplicates it’s better to have action types declared as constants.
This approach helps avoiding errors that will be difficult to debug.
*/