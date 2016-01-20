const BASE_URL = 'http://localhost:5000/api/';

function callApi(endpoint, authenticated) {
  let token = localStorage.getItem('token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw 'No token saved!'
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated } = callAPI;

  const [ requestType, successType, errorType ] = types;

  return callApi(endpoint, authenticated)
          .then(response => {
              next({response, authenticated, type: successType});
          })
          .catch(error => {
            next({
              error: error.message || 'There was an error.',
              type: errorType
            })
          })
}
