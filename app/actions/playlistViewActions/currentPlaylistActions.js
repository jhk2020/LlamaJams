import { routeActions } from 'redux-simple-router';

export function loadPlaylist(code) {
  return {
    types: ['LOAD_PLAYLIST', 'LOAD_PLAYLIST_SUCCESS', 'LOAD_PLAYLIST_FAIL'],
    promise: fetch(`http://localhost:5000/api/playlist/${code}`)
  }
}

export function setCurrentPlaylistCode(playlistCode) {
  return {
    type: 'SET_CURRENT_PLAYLIST_CODE',
    playlistCode
  }
}

export function receiveSocket(socketId) {
  return {
    type: 'RECEIVE_SOCKET',
    socketId
  }
}
