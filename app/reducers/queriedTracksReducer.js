export function queriedTracks (state = [], action) {
  switch (action.type) {
    case 'UPDATE_QUERY_TRACKS':
      return action.results;
    case 'CLEAR_QUERY':
      return [];
    default:
      return state;
  }
}
