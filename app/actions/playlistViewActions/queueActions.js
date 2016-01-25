import { CALL_API } from '../../middlewares/api';
import { toJS } from 'immutable';

export function addTrackToQueue(track) {
  return {
    type: 'ADD_TRACK_TO_QUEUE',
    track
  }
}

export function upVote(track) {
  return {
    type: 'UPVOTE_TRACK',
    track
  }
}

export function downVote(track) {
  return {
    type: 'DOWNVOTE_TRACK',
    track
  }
}

export function loadPlaylist(code) {
  return {
    [CALL_API]: {
      endpoint: 'playlist',
      method: 'GET',
      queryString: code,
      authenticated: true,
      types: ['LOAD_PLAYLIST_SUCCESS', 'LOAD_PLAYLIST_FAIL']
    }
  }
}

export function savePlaylist(code) {
  return (dispatch, getState) => {
    const { queue } = this.props;
    dispatch(savePlaylist(code, queue));
  }
}

export function savePlaylist(code, queue) {
  return {
    [CALL_API]: {
      endpoint: 'playlist',
      method: 'POST',
      data: {
        code,
        queue: toJS(queue)
      },
      authenticated: true,
      type: ['SAVE_PLAYLIST_SUCCESS', 'SAVE_PLAYLIST_FAIL']
    }
  }
}
