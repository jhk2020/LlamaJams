import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../containers/MainContainer';
import Auth from '../containers/AuthContainer';
import Home from '../containers/HomeContainer';
import Playlist from '../components/PlaylistView/Playlist';
import { syncHistory, routeReducer } from 'redux-simple-router';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/login',
      state: { nextStatePathname: nextState.location.pathname }
    })
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main} >
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path='/playlist/:id' component={Playlist} />
      <Route path='login' component={Auth} />
    </Route>
  </Router>
)

export default routes;
