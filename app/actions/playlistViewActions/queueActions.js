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
