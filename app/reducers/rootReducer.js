import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './authReducer';

const rootReducer = combineReducers({
  auth,
  routing: routeReducer
});

export default rootReducer;
