import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './authReducer';
import searchbarQuery from './searchbarReducer';
import queriedTracks from './queriedTracksReducer';
import queue from './queueReducer';
import player from './playerReducer';
import currentPlaylist from './currentPlaylistReducer';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';


const rootReducer = combineReducers({
  auth,
  currentPlaylist,
  searchbarQuery,
  queriedTracks,
  queue,
  player,
  routing: routeReducer,
  reduxAsyncConnect
});

export default rootReducer;
