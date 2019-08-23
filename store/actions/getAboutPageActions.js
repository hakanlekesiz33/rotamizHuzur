import fetch from 'node-fetch';
import * as actionTypes from './actionTypes';

export const aboutPageRequestSuccess = results => ({ type: actionTypes.SET_ABOUT_PAGE, results });
export const aboutPageRequestError = errors => ({ type: actionTypes.FETCH_ABOUT_PAGE_FAILED, errors });

export const fetchAboutPageItems = () => {
  return async (dispatch) => {
    const response = await fetch(`http://rotamizhuzur.xyz/Umbraco/Api/Orders/getLayoutItems`);
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(aboutPageRequestSuccess(json));
    } else {
      return dispatch(aboutPageRequestError([json]));
    }
  };
};
