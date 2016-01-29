export function addTrackToQueueAsync(track, playlistCode) {
  return {
    types: ['ADD_TRACK_TO_QUEUE_IN_DB', 'ADD_TRACK_TO_QUEUE_IN_DB_SUCCESS', 'ADD_TRACK_TO_QUEUE_IN_DB_FAIL'],
    promise: fetch(`http://localhost:5000/api/playlist/${playlistCode}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        track
      })
    })
  }
}

export function addTrackToQueue(track) {
  return {
    type: 'ADD_TRACK_TO_QUEUE',
    track
  }
}
