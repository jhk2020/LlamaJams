import jwt_decode from 'jwt-decode';

// export function createNewPlaylist(playlistName) {
//   return dispatch => {
//     return fetch('http://localhost:5000/api/playlist', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         playlistName: playlistName
//       })
//     })
//       .then(response => {
//         return response.json();
//       })
//       .then(response => {
//         try {
//           let decoded = jwt_decode(response.token);
//           localStorage.setItem('token', response.token);
//           dispatch(createPlaylistSuccess(decoded));
//           dispatch(routeActions.push(`/playlist/${response.playlist.code}`));
//         } catch (e) {
//           dispatch(createPlaylistFail(response.error));
//         }
//       })
//       .catch(err => console.error('Error: ', err));
//   }
// }

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
