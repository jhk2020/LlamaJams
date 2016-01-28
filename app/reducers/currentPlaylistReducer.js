import { Map, fromJS } from 'immutable';

const initialState = Map({
  _id: '',
  title: '',
  code: '',
  isOwner: false,
  socketId: ''
})

export default function currentPlaylist (state = initialState, action) {
  switch(action.type) {
    case 'CREATE_PLAYLIST_SUCCESS':
      return fromJS(action.res.playlist).update('isOwner', boolean => true);

    case 'CREATE_PLAYLIST_FAIL':
      return Map({
        _id: '',
        title: '',
        code: '',
        isOwner: false,
        socketId: ''
      })

    case 'RECEIVE_SOCKET':
      return state.update('socketId', socketId => action.socketId);

    default:
      return state;
  }
}
