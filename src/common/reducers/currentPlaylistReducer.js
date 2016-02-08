import { Map, fromJS } from 'immutable';

const initialState = Map({
  _id: '',
  title: '',
  code: '',
  isOwner: false,
  socketId: '',
  error: ''
});

export default function currentPlaylist(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_PLAYLIST_SUCCESS':
      return fromJS(action.res.playlist).update('isOwner', boolean => true);

    case 'CREATE_PLAYLIST_FAIL':
      return state.update('error', error => action.error);

    case 'LOAD_PLAYLIST_SUCCESS':
      var temp = Object.assign({}, action.res.playlist, {
        socketId: '',
        error: ''
      })
      return fromJS(temp);
    case 'LOAD_PLAYLIST_FAIL':
      return state.update('error', error => action.error);

    case 'RECEIVE_SOCKET':
      return state.update('socketId', socketId => action.socketId);

    default:
      return state;
  }
}
