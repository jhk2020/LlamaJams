const initialState = {
  errorMessage: '',
  isCreating: false,
  isLoading: false
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_PLAYLIST':
      return Object.assign({}, state, {
        isCreating: true
      });
    case 'CREATE_PLAYLIST_SUCCESS':
      return Object.assign({}, {
        errorMessage: '',
        isCreating: false
      });
    case 'CREATE_PLAYLIST_FAIL':
      return Object.assign({}, {
        errorMessage: action.error,
        isCreating: false
      });
    case 'LOAD_PLAYLIST':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'LOAD_PLAYLIST_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: action.error
      })
    case 'LOAD_PLAYLIST_FAIL':
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: action.error
      })
    default:
      return state;
  }
}
