const initialState = {
  trackResults: [],
  nextPageUrl: ''
}

export default function queriedTracks (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_QUERY_TRACKS':
      return Object.assign({}, state, {
        trackResults: state.trackResults.slice().concat(action.results)
      });
    case 'CLEAR_QUERY':
      return Object.assign({}, state, {
        trackResults: [],
        nextPageUrl: ''
      });
    case 'SAVE_NEXT_PAGE_URL':
      return Object.assign({}, state, {
        nextPageUrl: action.url
      })
    default:
      return state;
  }
}
