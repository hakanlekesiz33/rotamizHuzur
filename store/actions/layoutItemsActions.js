import fetch from 'node-fetch';
import * as actionTypes from './actionTypes';

export const layoutRequestSuccess = results => ({ type: actionTypes.SET_LAYOUTITEMS, results });
export const layoutRequestError = errors => ({ type: actionTypes.FETCH_LAYOUTITEMS_FAILED, errors });

export const fetchLayoutItems = () => {
  return async (dispatch) => {
    const response = await fetch(`http://rotamizhuzur.xyz/Umbraco/Api/Orders/getLayoutItems`);
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(layoutRequestSuccess(json));
    } else {
      return dispatch(layoutRequestError([json]));
    }
  };
};
