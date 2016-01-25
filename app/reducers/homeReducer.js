import { Map, List, fromJS } from 'immutable';
import { UPDATE_LOCATION } from 'redux-simple-router';

const initialState = Map({
  userPlaylists: List(),
  currentPlaylist: Map({
    _id: '',
    title: '',
    code: ''
  }),
  errorMessage: ''
})

export default function userPlaylists (state = initialState, action) {
  switch(action.type) {
    case 'CREATE_PLAYLIST_SUCCESS':
      let newState = state.update('userPlaylists', playlists => playlists.push(action.response.newPlaylist));
      return newState.set('currentPlaylist', Map(action.response.newPlaylist));
    case 'CREATE_PLAYLIST_FAIL':
      return state.update('errorMessage', message => action.error);
    case 'FETCH_PLAYLIST_SUCCESS':
      return state.update('userPlaylists', playlists => playlists.concat(fromJS(action.response.playlists)));
    case 'FETCH_PLAYLIST_FAIL':
      return state.update('errorMessage', message => action.error);
    case 'SET_CURRENT_PLAYLIST':
      return state.update('currentPlaylist', playlist => action.playlist)
    case 'UPDATE_LOCATION':
      return state.update('userPlaylists', playlists => List());
    default:
      return state;
  }
}
