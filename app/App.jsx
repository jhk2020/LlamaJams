import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/ConfigStore';
import getRoutes from './routes/routes';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';

let initialState;
if(window.__INITIAL_STATE__) {
  try {
    initialState = JSON.parse(unescape(window.__INITIAL_STATE__));
  } catch(err) {
    throw err;
  }
}

const arr = ['searchbarQuery', 'queriedTracks', 'queue', 'player'];

Object.keys(initialState).forEach(key => {
  if (arr.indexOf(key) !== -1) {
    initialState[key] = fromJS(initialState[key]);
  }
});

const store = configStore(browserHistory, initialState);

const node = (
  <Provider store={store}>
    { getRoutes() }
  </Provider>
)

ReactDOM.render(node, document.getElementById('app'));
