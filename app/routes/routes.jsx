import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../components/Main';
import Home from '../containers/HomeContainer';
import Playlist from '../containers/PlaylistContainer';
import { syncHistory, routeReducer } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

export default function() {
  return (
    <Route path='/' component={Main} >
      <IndexRoute component={Home} />
      <Route path='playlist/:id' component={Playlist} />
    </Route>
  )
}
