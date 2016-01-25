import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/HomeView/Home';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/playlistViewActions/homeActions';
import { routeActions } from 'redux-simple-router';

function mapStateToProps(state) {
  return {
    userPlaylists: state.home.get('userPlaylists'),
    errorMessage: state.home.get('errorMessage'),
    currentPlaylist: state.home.get('currentPlaylist')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    goToPlaylist: (playlist) => {
      dispatch(routeActions.push(`/playlist/${playlist.get('_id')}`));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
