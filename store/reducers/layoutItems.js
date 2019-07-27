import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: false
}

function layoutItems(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LAYOUTITEMS: {
      return {
        ...state,
        ...action.results[0],
        error: false,
      };
    }
    case actionTypes.FETCH_LAYOUTITEMS_FAILED: {
      return {
        ...state,
        error: true
      };
    }
    default:
      return state;
  }
}

export default layoutItems;
