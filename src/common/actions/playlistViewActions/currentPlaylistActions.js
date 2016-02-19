import request from 'superagent';
import config from '../../../config';
import cookie from 'react-cookie';

export function loadPlaylist(code) {
  return {
    types: ['LOAD_PLAYLIST', 'LOAD_PLAYLIST_SUCCESS', 'LOAD_PLAYLIST_FAIL'],
    promise: generatePromise(code)
  }
}

function generatePromise (body) {
  const promise = new Promise((resolve, reject) => {
    const parsedCookie = cookie.load('userInfo') || {};
    request
    .get(`https://llamajams.herokuapp.com/api/playlist/${body}`)
    .set('Cookie', parsedCookie)
    .end((err, data) => err ? reject(err) : resolve(data));
  });
  return promise;
}

export function receiveSocket(socketId) {
  return {
    type: 'RECEIVE_SOCKET',
    socketId
  }
}
