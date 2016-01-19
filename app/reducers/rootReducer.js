import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import home from './homeReducer';

const rootReducer = combineReducers({
  home,
  routing: routeReducer
});

export default rootReducer;
