import { combineReducers } from "redux";
import { cryptoState, searchData, cryptoItem } from './crypto';

const cryptoReducer = combineReducers({
  cryptoState,
  searchData,
  cryptoItem
});

export default cryptoReducer;
