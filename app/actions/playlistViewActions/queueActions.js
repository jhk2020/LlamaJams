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
