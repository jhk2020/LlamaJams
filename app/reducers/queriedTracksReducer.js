import { List, Map, fromJS } from 'immutable';

const initialState = Map({
  trackResults: List(),
  nextPageUrl: ''
});

export default function queriedTracks (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_QUERY_TRACKS':
      return state.update('trackResults', results => results.concat(fromJS(action.results)));
    case 'CLEAR_QUERY':
      const tempState = state.update('trackResults', results => List());
      return tempState.update('nextPageUrl', url => '');
    case 'SAVE_NEXT_PAGE_URL':
      return state.update('nextPageUrl', oldurl => action.url);
    default:
      return state;
  }
}
