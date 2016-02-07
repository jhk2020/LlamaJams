import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Home from '../containers/Home/HomeContainer';
import Playlist from '../containers/Playlist/PlaylistContainer';

export default function() {
  return (
    <Route path='/' component={Main} >
      <IndexRoute component={Home} />
      <Route path='playlist/:id' component={Playlist} />
    </Route>
  )
}
