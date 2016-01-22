const initialState = {
  jukeboxPlaying: false,
  trackPosition: null,
  playlistPosition: -1,
  currentStream: null,
  currentTrack: null
}

export default function player(state = initialState, action) {
  switch(action.type) {
    case 'SET_CURRENT_TRACK':
      return Object.assign({}, state, {
        currentTrack: action.track,
        currentStream: action.stream,
        jukeboxPlaying: true
      });
    case 'CONTINUE_PLAYING':
      return Object.assign({}, state, {
        jukeboxPlaying: true
      });
    case 'PAUSE_PLAYING':
      return Object.assign({}, state, {
        jukeboxPlaying: false
      });
    case 'PLAY_NEXT_TRACK':
      return Object.assign({}, state, {
        currentStream: null,
        currentTrack: null
      });
    default:
      return state;
  }
}
