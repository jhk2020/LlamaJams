import React from 'react';
import { connect } from 'react-redux';
import Home from '../../components/homeView/Home';
import { createNewPlaylist } from '../../actions/homeActions';
import { loadPlaylist } from '../../actions/playlistViewActions/currentPlaylistActions';
import { routeActions } from 'react-router-redux';

function mapStateToProps(state) {
  const { home, currentPlaylist } = state;
  return {
    errorMessage: home.errorMessage,
    currentPlaylist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewPlaylist: (playlistName) => {
      dispatch(createNewPlaylist(playlistName));
    },
    loadPlaylist: (code) => {
      dispatch(loadPlaylist(code));
    },
    moveTo: (route) => {
      dispatch(routeActions.push(route));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
