import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Playlist from '../components/PlaylistView/Playlist';
import * as actionCreators from '../actions/playlistViewActions/currentPlaylistActions';
import io from 'socket.io-client';

const socket = io('', { path: '/api/queue'});

function mapStateToProps(state) {
  return {
    currentPlaylist: state.currentPlaylist,
    socket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
