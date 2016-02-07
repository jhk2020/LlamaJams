import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from '../common/store/ConfigStore';
import getRoutes from '../common/routes/routes';
import { Router, browserHistory, match } from 'react-router';
import { fromJS } from 'immutable';
import createLocation from 'history/lib/createLocation';

let initialState;
if(window.__INITIAL_STATE__) {
  try {
    initialState = JSON.parse(unescape(window.__INITIAL_STATE__));
  } catch(err) {
    throw err;
  }
}

const arr = ['searchbarQuery', 'currentPlaylist', 'searchTracks', 'queue', 'player'];

Object.keys(initialState).forEach(key => {
  if (arr.indexOf(key) !== -1) {
    initialState[key] = fromJS(initialState[key]);
  }
});

const store = configStore(browserHistory, initialState);

const node = (
  <Provider store={store}>
    <Router history={browserHistory}>
      { getRoutes() }
    </Router>
  </Provider>
)

ReactDOM.render(node, document.getElementById('app'));
