export function startPlaying() {
  return (dispatch, getState) => {
    const { queue } = getState();
    const firstTrack = queue.slice().shift();
    SC.stream('/tracks/' + firstTrack.id)
      .then((stream) => {
      stream.play();
      dispatch(setCurrentTrack(stream, firstTrack));
      });
  }
}

export function playNextTrack(track) {
  return (dispatch, getState) => {
    const { queue } = getState();
    SC.stream('/tracks/' + track.id, (stream) => {
      stream.play();
      dispatch(setCurrentTrack(stream, track));
    });
  }
}

function setCurrentTrack(stream, track) {
  return {
    type: 'SET_CURRENT_TRACK',
    stream,
    track
  }
}

export function togglePlayButton() {
  return (dispatch, getState) => {
    let { jukeboxPlaying, currentTrack, currentStream } = getState().player;
    if (!jukeboxPlaying) {
      currentStream.play();
      dispatch(continuePlaying(currentTrack));
    } else {
      currentStream.pause();
      dispatch(pausePlaying(currentTrack));
    }
  }
}

function continuePlaying() {
  return {
    type: 'CONTINUE_PLAYING'
  }
}

function pausePlaying() {
  return {
    type: 'PAUSE_PLAYING'
  }
}
