import { combineReducers } from 'redux';
import layoutItems from './layoutItems';
import aboutPageItems from './aboutPageItems';

const rootReducer = combineReducers({
  aboutPageItems,
  layoutItems
});

export default rootReducer;
