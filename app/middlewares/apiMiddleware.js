const BASE_URL = 'http://localhost:5000/api/';

function callApi(endpoint, method, data, queryString, authenticated) {
  let token = localStorage.getItem('token') || null;
  let config = {};
  let url = '';

  if (authenticated) {
    if (token) {
      config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: method,
        body: data ? JSON.stringify({data}) : null
      }
    } else {
      throw 'No token saved!'
    }
  }

  if (queryString) {
    url = BASE_URL + endpoint + '?code=' + queryString;
  } else {
    url = BASE_URL + endpoint;
  }

  return fetch(url, config)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('api: ', response)
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

  let { endpoint, types, method, data, queryString, authenticated, callback } = callAPI;

  const [ successType, errorType ] = types;

  return callApi(endpoint, method, data, queryString, authenticated)
          .then(response => {
              next({response, type: successType}),
            error => {
              next({
                error: error.message || 'There was an error.',
                type: errorType
              })
            }
          })
}
