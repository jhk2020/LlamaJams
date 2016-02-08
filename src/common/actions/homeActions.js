import request from 'superagent';
import config from '../../config';

export function createNewPlaylist(playlistName) {
  return {
    types: ['CREATE_PLAYLIST_SUCCESS', 'CREATE_PLAYLIST_FAIL'],
    promise: generatePromise({ playlistName })
  }
}

function generatePromise (body) {
  const promise = new Promise((resolve, reject) => {
    request
    .post('http://localhost:5000/api/playlist')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(body))
    .end((err, data) => err ? reject(err) : resolve(data));
  });
  return promise;
}
