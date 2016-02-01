import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/homeView/Home';
import { createNewPlaylist } from '../actions/homeActions';
import { setCurrentPlaylistCode, loadPlaylist } from '../actions/playlistViewActions/currentPlaylistActions';
import { routeActions } from 'redux-simple-router';

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
    setCurrentPlaylistCode: (code) => {
      dispatch(setCurrentPlaylistCode(code));
    },
    loadPlaylist: (code) => {
      dispatch(loadPlaylist(code));
    },
    pushState: (route) => {
      dispatch(routeActions.push(route));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
