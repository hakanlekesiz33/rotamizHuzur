import fetch from 'node-fetch';
import * as actionTypes from './actionTypes';


export const searchRequest = () => ({ type: actionTypes.SEARCH_REQUEST });
export const searchSuccess = results => ({ type: actionTypes.SEARCH_SUCCESS, results });
export const searchError = errors => ({ type: actionTypes.SEARCH_ERROR, errors });
export const randomCardRequest = () => ({ type: actionTypes.RANDOM_CARD_REQUEST });
export const randomCardSuccess = details => ({ type: actionTypes.RANDOM_CARD_SUCCESS, details });
export const randomCardError = errors => ({ type: actionTypes.RANDOM_CARD_ERROR, errors });
export const cardDetailsRequest = () => ({ type: actionTypes.CARD_DETAILS_REQUEST });
export const cardDetailsSuccess = details => ({ type: actionTypes.CARD_DETAILS_SUCCESS, details });
export const cardDetailsError = errors => ({ type: actionTypes.CARD_DETAILS_ERROR, errors });

export const fetchCards = (selectedFormat, searchPhrase) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    const response = await fetch(`https://api.scryfall.com/cards/search?q=f:${selectedFormat}+${searchPhrase}`);
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(searchSuccess(json.data));
    } else {
      return dispatch(searchError([json.details]));
    }
  };
};

export const fetchRandomCard = () => {
  return async (dispatch) => {
    dispatch(randomCardRequest());
    const response = await fetch('https://api.scryfall.com/cards/random');
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(randomCardSuccess(json));
    } else {
      return dispatch(randomCardError(['Random Card Not Found']));
    }
  }
}

export const fetchCardDetails = (cardId) => {
  return async (dispatch) => {
    dispatch(cardDetailsRequest());
    const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(cardDetailsSuccess(json));
    } else {
      return dispatch(cardDetailsError(['Card Not Found']));
    }
  }
}
