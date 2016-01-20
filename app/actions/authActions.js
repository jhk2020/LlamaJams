import { routeActions } from 'redux-simple-router';
import jwt_decode from 'jwt-decode';


function requestSignup(info) {
  return {
    type: 'REQUEST_SIGNUP',
    info
  }
}

function signupError(error) {
  return {
    type: 'SIGNUP_ERROR',
    error
  }
}

export function signupUser(credentials) {
  return dispatch => {
    dispatch(requestSignup(credentials));

    return fetch('http://localhost:5000/users', {
      method: 'POST',
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
      return response.json();
    })
    .then(response => {
      try {
        let decoded = jwt_decode(response.token);
        localStorage.setItem('token', response.token);
        dispatch(loginSuccess(decoded));
        dispatch(routeActions.push('/'));
      } catch (e) {
        dispatch(signupError(response.error));
      }
    })
    .catch(err => console.error('Error: ', err));
  }
}

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

function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    error
  }
}

export function loginUser(credentials) {
  return dispatch => {
    dispatch(requestLogin(credentials));

    return fetch('http://localhost:5000/api/authenticate', {
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
        return response.json();
      })
      .then(response => {
        try {
          let decoded = jwt_decode(response.token);
          localStorage.setItem('token', response.token);
          dispatch(loginSuccess(decoded));
          dispatch(routeActions.push('/'));
        } catch (e) {
          dispatch(loginError(response.error));
        }
      })
      .catch(err => console.error('Error: ', err));
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

export function redirectToLogin() {
  return dispatch => {
    dispatch(routeActions.push('/login'));
  }
}
