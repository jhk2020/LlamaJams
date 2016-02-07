import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import home from './homeReducer';
import searchbarQuery from './searchReducer';
import searchTracks from './searchTracksReducer';
import queue from './queueReducer';
import player from './playerReducer';
import currentPlaylist from './currentPlaylistReducer';

const rootReducer = combineReducers({
  home,
  currentPlaylist,
  searchbarQuery,
  searchTracks,
  queue,
  player,
  routing: routeReducer
});

export default rootReducer;
