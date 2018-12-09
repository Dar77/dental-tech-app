// src/reducers/index.js
// redux reducers
import { ADD_ALLOY, ADD_WAX_WEIGHT, SELECTED_ALLOY, CALCULATE_ALLOY, DELETE_ALLOY } from '../constants/action-types';

const initialState = {
  alloys: [],
  waxWeight: 0,
  selected: '',
  calculate: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALLOY: {
      return { ...state, alloys: [...state.alloys, action.payload] };
    }

    case ADD_WAX_WEIGHT: {
      return { ...state, waxWeight: action.payload };
    }

    case SELECTED_ALLOY: {
    	return { ...state, selected: action.payload };
    }

    case CALCULATE_ALLOY: {
      return { ...state, calculate: action.payload };
    }

    case DELETE_ALLOY: {
      return {
        ...state,
        alloys: state.alloys.filter( (item, index) => index !== action.payload.index)
      };
    }

    default:
      return state;
  }

};

export default rootReducer;








/* example reducer file ref: https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7
import types from './types';

const INITIAL_STATE = {
  count: 0,
  subreddit: '',
  showSpinner: false,
  subredditData: []
}
const homeReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case types.INCREMENT_COUNT: {
      const { value } = action;
      const { count } = state;
      return {
        ...state,
        count: count + value
      }
    }

    case types.DECREMENT_COUNT: {
      const { value } = action;
      const { count } = state;
      return {
        ...state,
        count: count - value
      }
    }

    case types.REQUEST_SUBREDDIT_JSON: {
      const { subreddit } = action;
      return {
        ...state,
        subreddit,
        subredditData: [],
        showSpinner: true
      }
    }

    case types.RECEIVE_SUBREDDIT_JSON: {
      const { subredditData } = action;
      return {
        ...state,
        subredditData,
        showSpinner: false

      }
    }

    default: return state;
  }
}

export default homeReducer;
*/