import React from 'react';
import { connect } from 'react-redux';
import Player from '../components/PlaylistView/Player';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/playlistViewActions/playerActions';

function mapStateToProps(state) {
  let { jukeboxPlaying, trackPosition, currentTrack, currentStream } = state.player;
  return {
    jukeboxPlaying,
    trackPosition,
    currentTrack,
    currentStream
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
