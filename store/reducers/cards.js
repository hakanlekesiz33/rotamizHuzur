import * as actionTypes from '../actions/actionTypes';

const initialState = {
  results: [],
  details: {},
  errors: [],
  isFetching: false,
};

function cards(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
    case actionTypes.RANDOM_CARD_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    }
    case actionTypes.SEARCH_ERROR: {
      return {
        ...state,
        results: [],
        errors: action.errors,
        isFetching: false,
      };
    }
    case actionTypes.RANDOM_CARD_SUCCESS:
    case actionTypes.CARD_DETAILS_SUCCESS: {
      return {
        ...state,
        details: action.details,
        isFetching: false,
      };
    }
    case actionTypes.RANDOM_CARD_ERROR:
    case actionTypes.CARD_DETAILS_ERROR: {
      return {
        ...state,
        results: [],
        errors: action.errors,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}

export default cards;
