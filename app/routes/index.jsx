import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../containers/MainContainer';
import Home from '../containers/HomeContainer';
import { syncHistory, routeReducer } from 'redux-simple-router';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <Route path='/login' component={Home} />
    </Route>
  </Router>
)

export default routes;
