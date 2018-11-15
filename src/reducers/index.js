// src/reducers/index.js
// redux reducers
import { ADD_ALLOY } from "../constants/action-types";
const initialState = {
  alloys: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALLOY:
      return { ...state, alloys: [...state.alloys, action.payload] };
    default:
      return state;
  }
};
export default rootReducer;