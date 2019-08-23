import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: false
}

function aboutPageItems(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ABOUT_PAGE: {
      return {
        ...state,
        ...action.results[0],
        error: false,
      };
    }
    case actionTypes.FETCH_ABOUT_PAGE_FAILED: {
      return {
        ...state,
        error: true
      };
    }
    default:
      return state;
  }
}

export default aboutPageItems;
