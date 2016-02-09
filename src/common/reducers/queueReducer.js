import { List, fromJS } from 'immutable';

export default function queue(state = List(), action) {
  switch(action.type) {
    case 'ADD_TRACK_TO_QUEUE':
      const track = fromJS(action.track);
      return state.push(track);

    case 'SET_CURRENT_TRACK':
      if (state.size === 1 || 0) {
        return List();
      }
      return state.slice(1);

    case 'SET_CURRENT_TRACK_FOR_GUESTS':
      debugger;
      const sliceIndex = state.findIndex(track => track.get('_id') === action.track._id);
      return state.slice(sliceIndex + 1);

    case 'UPVOTE_TRACK':
      const updatedQueue = state.updateIn(
        [state.findIndex(track => track.get('_id') === action.trackId), 'vote'],
        vote => vote + 1
      );
      return updatedQueue.sortBy(track => track.get('vote'), (a, b) => b - a);

    case 'DOWNVOTE_TRACK':
      const index = state.findIndex(track => track.get('_id') === action.trackId);
      let newQueue = state.updateIn(
        [index, 'vote'],
        vote => vote - 1
      );
      if (state.getIn([index, 'vote']) <= -2) {
        newQueue = state.delete(index);
      }
      return newQueue.sortBy(track => track.get('vote'), (a, b) => b - a);

    case 'LOAD_PLAYLIST_SUCCESS':
      const loadedQueue = action.res.playlist.queue.sort((a, b) => b.vote - a.vote);
      return state.concat(fromJS(loadedQueue));

    case 'LOAD_PLAYLIST_FAIL':
      return state;

    default:
      return state;
  }
}
