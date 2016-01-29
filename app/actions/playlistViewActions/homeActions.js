import { CALL_API } from '../../middlewares/apiMiddleware';

export function createNewPlaylist(playlistName) {
  return {
    [CALL_API]: {
      endpoint: 'users/playlist',
      method: 'POST',
      data: playlistName,
      authenticated: true,
      types: ['SET_CURRENT_PLAYLIST_SUCCESS', 'SET_CURRENT_PLAYLIST_FAIL']
    }
  }
}

export function setCurrentPlaylist(playlist) {
  return {
    type: 'SET_CURRENT_PLAYLIST',
    playlist
  }
}
