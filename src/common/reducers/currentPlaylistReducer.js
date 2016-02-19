import { Map, fromJS } from 'immutable';
import cookie from 'react-cookie';

const initialState = Map({
  _id: '',
  title: '',
  code: '',
  isOwner: false,
  socketId: '',
});

export default function currentPlaylist(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_PLAYLIST_SUCCESS':
      return fromJS(action.res.playlist).update('isOwner', boolean => true);

    case 'LOAD_PLAYLIST_SUCCESS':
      const parsedCookie = cookie.load('userInfo');
      const isOwner = (parsedCookie && parsedCookie.playlistCode === action.res.playlist.code) ? true : false;
      var temp = Object.assign({}, action.res.playlist, {
        socketId: '',
        error: '',
        isOwner
      })
      return fromJS(temp);

    case 'RECEIVE_SOCKET':
      return state.update('socketId', socketId => action.socketId);

    default:
      return state;
  }
}
