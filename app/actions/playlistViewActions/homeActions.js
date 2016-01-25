import { CALL_API } from '../../middlewares/api';

export function createNewPlaylist(playlistName) {
  return {
    [CALL_API]: {
      endpoint: 'users/playlist',
      method: 'POST',
      data: playlistName,
      authenticated: true,
      types: ['CREATE_PLAYLIST_SUCCESS', 'CREATE_PLAYLIST_FAIL']
    }
  }
}

export function fetchPlaylists() {
  return {
    [CALL_API]: {
      endpoint: 'users/playlist',
      method: 'GET',
      authenticated: true,
      types: ['FETCH_PLAYLIST_SUCCESS', 'FETCH_PLAYLIST_FAIL']
    }
  }
}

export function setCurrentPlaylist(playlist) {
  return {
    type: 'SET_CURRENT_PLAYLIST',
    playlist
  }
}
