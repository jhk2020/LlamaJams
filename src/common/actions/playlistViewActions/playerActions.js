export function startPlaying() {
  return (dispatch, getState) => {
    const { queue } = getState();
    if (queue.size > 0) {
      const firstTrack = queue.first();
      SC.stream('/tracks/' + firstTrack.get('soundCloudId'))
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

export function skipSong() {
  return (dispatch, getState) => {
    const { queue, player } = getState();
    if (queue.size === 0) {
      const currentStream = player.get('currentStream');
      currentStream.pause();
      dispatch(pausePlaying());
    }
    dispatch(playNextTrack());
  }
}

function setCurrentTrack(stream, track) {
  return {
    type: 'SET_CURRENT_TRACK',
    stream,
    track
  }
}

export function setCurrentTrackForGuests(track) {
  return {
    type: 'SET_CURRENT_TRACK_FOR_GUESTS',
    track
  }
}

function playNextTrack() {
  return {
    type: 'PLAY_NEXT_TRACK'
  }
}

export function togglePlayButton() {
  return (dispatch, getState) => {
    const jukeboxPlaying = getState().player.get('jukeboxPlaying');
    const currentStream = getState().player.get('currentStream');
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
