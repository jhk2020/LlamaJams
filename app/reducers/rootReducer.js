import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './authReducer';
import searchbarQuery from './searchbarReducer';

const rootReducer = combineReducers({
  auth,
  searchbarQuery,
  routing: routeReducer
});

export default rootReducer;
