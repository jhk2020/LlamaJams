import { CALL_API } from '../../middlewares/apiMiddleware';
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
    types: ['LOAD_PLAYLIST', 'LOAD_PLAYLIST_SUCCESS', 'LOAD_PLAYLIST_FAIL'],
    promise: fetch('http://localhost:5000/api/playlist?code=' + code)
  }
}

function loadPlaylistSuccess(res) {
  return {
    type: 'LOAD_PLAYLIST_SUCCESS',
    res
  }
}

function loadPlaylistFail(error) {
  return {
    type: 'LOAD_PLAYLIST_FAIL',
    error
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
