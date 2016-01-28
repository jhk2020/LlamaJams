export function createNewPlaylist(playlistName) {
  return {
    types: ['CREATE_PLAYLIST', 'CREATE_PLAYLIST_SUCCESS', 'CREATE_PLAYLIST_FAIL'],
    promise: fetch('http://localhost:5000/api/playlist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlistName: playlistName
      })
    })
  }
}
