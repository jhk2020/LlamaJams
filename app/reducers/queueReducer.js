export default function queue(state = [], action) {
  switch(action.type) {
    case 'ADD_TRACK_TO_PLAYLIST':
      return state.slice().concat(action.track);
    case 'SET_CURRENT_TRACK':
      if (state.length === 1) {
        return [];
      }
      return state.slice(1);
    default:
      return state;
  }
}
