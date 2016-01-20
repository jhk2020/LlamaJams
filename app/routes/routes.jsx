import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../containers/MainContainer';
import Auth from '../containers/AuthContainer';
import Home from '../containers/HomeContainer';
import Profile from '../containers/ProfileContainer';
import { syncHistory, routeReducer } from 'redux-simple-router';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='login' component={Auth} />
      <Route path='profile' component={Profile} />
    </Route>
  </Router>
)

export default routes;
