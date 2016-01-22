export function startPlaying() {
  return (dispatch, getState) => {
    const { queue } = getState();
    if (queue.length > 0) {
      const firstTrack = Object.assign({}, queue[0]);
      SC.stream('/tracks/' + firstTrack.id)
      .then((stream) => {
        dispatch(setCurrentTrack(stream, firstTrack));
        stream.play();
        stream.on('finish', () => {
          dispatch(playNextTrack());
        });
      });
    }
  }
}

function setCurrentTrack(stream, track) {
  return {
    type: 'SET_CURRENT_TRACK',
    stream,
    track
  }
}

function playNextTrack() {
  return {
    type: 'PLAY_NEXT_TRACK'
  }
}

export function skipSong() {
  return (dispatch, getState) => {
    const { queue, currentStream } = getState();
    if (queue.length === 0) {
      dispatch(togglePlayButton());
    }
    dispatch(playNextTrack());
  }
}

export function togglePlayButton() {
  return (dispatch, getState) => {
    let { jukeboxPlaying, currentStream } = getState().player;
    if (!jukeboxPlaying) {
      currentStream.play();
      dispatch(continuePlaying());
    } else {
      currentStream.pause();
      dispatch(pausePlaying());
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
