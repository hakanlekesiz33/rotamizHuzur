import { combineReducers } from 'redux';
import cards from './cards';
import layoutItems from './layoutItems';

const rootReducer = combineReducers({
  cards,
  layoutItems,
});

export default rootReducer;
