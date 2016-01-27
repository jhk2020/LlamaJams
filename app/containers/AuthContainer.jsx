import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Auth from '../components/AuthView/Auth';
import { createNewPlaylist } from '../actions/authActions';
import { routeActions } from 'redux-simple-router';

function mapStateToProps(state) {
  const { auth, currentPlaylist } = state;
  return {
    errorMessage: auth.errorMessage,
    currentPlaylist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewPlaylist: (playlistName) => {
      dispatch(createNewPlaylist(playlistName));
    },
    pushState: (route) => {
      dispatch(routeActions.push(route));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
