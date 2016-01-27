const initialState = {
  errorMessage: ''
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_PLAYLIST_SUCCESS':
      return Object.assign({}, state, {
        errorMessage: ''
      });
    case 'CREATE_PLAYLIST_FAIL':
      return Object.assign({}, state, {
        errorMessage: action.error
      });
    default:
      return state;
  }
}
