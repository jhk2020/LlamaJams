export function upVote(trackId) {
  return {
    type: 'UPVOTE_TRACK',
    trackId
  }
}

export function downVote(trackId) {
  return {
    type: 'DOWNVOTE_TRACK',
    trackId
  }
}
