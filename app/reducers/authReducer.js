const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  username: '',
  errorMessage: '',
  showForm: ''
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_FORM':
      return Object.assign({}, state, {
        showForm: action.formType
      });

    case 'REQUEST_SIGNUP':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: action.info.username
      });

    case 'SIGNUP_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      })

    case 'REQUEST_LOGIN':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: action.credentials.username
      });

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });

    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      });

    case 'REQUEST_LOGOUT':
      return Object.assign({}, state, {
        isFetching: true
      });

    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });

    default:
      return state;
  }
}
