import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from '../containers/MainContainer';
import Auth from '../containers/AuthContainer';
import Home from '../containers/Home'
import Playlist from '../components/PlaylistView/Playlist';
import { syncHistory, routeReducer } from 'redux-simple-router';
import jwt_decode from 'jwt-decode';
import { ReduxAsyncConnect } from 'redux-async-connect';

// function checkIfOwner(nextState, replace) {
//   const token = localStorage.getItem('token');
//   if(token) {
//     let decoded = jwt_decode(token);
//     replace({
//       pathname: `/playlist/${decoded.playlistCode}`
//     });
//   }
// }

export default function() {
  return (
    <Router render={ (props) => <ReduxAsyncConnect {...props}/> } history={browserHistory}>
      <Route path='/' component={Main} >
        <IndexRoute component={Auth} />
        <Route path='/playlist/:id' component={Playlist} />
      </Route>
    </Router>
  )
}
