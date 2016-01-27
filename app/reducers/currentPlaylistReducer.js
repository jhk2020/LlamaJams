import { Map, fromJS } from 'immutable';
import { UPDATE_LOCATION } from 'redux-simple-router';

const initialState = Map({
  _id: '',
  title: '',
  code: '',
  isOwner: false
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
        isOwner: false
      })
    default:
      return state;
  }
}
