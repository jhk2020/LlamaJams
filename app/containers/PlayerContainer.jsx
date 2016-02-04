import React from 'react';
import { connect } from 'react-redux';
import Player from '../components/PlaylistView/Player';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/playlistViewActions/playerActions';

function mapStateToProps(state) {
  const jukeboxPlaying = state.player.get('jukeboxPlaying'),
      trackPosition = state.player.get('trackPosition'),
      currentTrack = state.player.get('currentTrack'),
      currentStream = state.player.get('currentStream'),
      playlistCode = state.currentPlaylist.get('code');
      
  return {
    jukeboxPlaying,
    trackPosition,
    currentTrack,
    currentStream,
    playlistCode,
    isOwner: state.currentPlaylist.get('isOwner')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
