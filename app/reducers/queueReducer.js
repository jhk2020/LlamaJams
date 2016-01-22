export default function queue(state = [], action) {
  switch(action.type) {
    case 'ADD_TRACK_TO_PLAYLIST':
      return state.slice().concat(action.track);
    default:
      return state;
  }
}
