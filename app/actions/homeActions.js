import { routeActions } from 'redux-simple-router';

export function showForm(formType) {
  return {
    type: 'SHOW_FORM',
    formType
  }
}

function requestLogin(credentials) {
  return {
    type: 'REQUEST_LOGIN',
    credentials
  }
}

function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  }
}

function loginError(err) {
  return {
    type: 'LOGIN_ERROR',
    err
  }
}

export function loginUser(credentials) {
  return dispatch => {
    dispatch(requestLogin(credentials));

    return fetch('http://localhost:5000/auth/getToken', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    })
      .then(response => {
        return response.json())
        .then(response) => {
          if (!response.ok) {
            dispatch(loginError(user.message));
            return Promise.reject(user)
          } else {
            localStorage.setItem('token', user.id_token);
            dispatch(loginSuccess(user));
          }
        }).catch(err => console.error('Error: ', err));
  }
}

function requestLogout() {
  return {
    type: 'REQUEST_LOGOUT'
  }
}

function logoutSuccess() {
  return {
    type:  'LOGOUT_SUCCESS'
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(logoutSuccess());
  }
}
