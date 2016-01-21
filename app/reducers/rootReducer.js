import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './authReducer';
import searchbarQuery from './searchbarReducer';
import queriedTracks from './queriedTracksReducer';

const rootReducer = combineReducers({
  auth,
  searchbarQuery,
  queriedTracks,
  routing: routeReducer
});

export default rootReducer;
