import { Map } from 'immutable';

const initialState = Map({
  jukeboxPlaying: false,
  trackPosition: null,
  playlistPosition: -1,
  currentStream: null,
  currentTrack: null
});

export default function player(state = initialState, action) {
  switch(action.type) {
    case 'SET_CURRENT_TRACK':
      return state.withMutations(map => {
        map.set('currentTrack', action.track)
           .set('currentStream', action.stream)
           .set('jukeboxPlaying', true);
      });
    case 'CONTINUE_PLAYING':
      return state.update('jukeboxPlaying', boolean => true);
    case 'PAUSE_PLAYING':
      return state.update('jukeboxPlaying', boolean => false);
    case 'PLAY_NEXT_TRACK':
      return state.withMutations(map => {
        map.set('currentStream', null)
           .set('currentTrack', null);
      });
    default:
      return state;
  }
}
