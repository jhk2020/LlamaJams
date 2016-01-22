import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './authReducer';
import searchbarQuery from './searchbarReducer';
import queriedTracks from './queriedTracksReducer';
import queue from './queueReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  auth,
  searchbarQuery,
  queriedTracks,
  queue,
  player,
  routing: routeReducer
});

export default rootReducer;
