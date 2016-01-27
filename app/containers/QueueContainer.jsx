import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/playlistViewActions/queueActions';
import Queue from '../components/PlaylistView/Queue';

function mapStateToProps(state) {
  return {
    queue: state.queue,
    playlistCode: state.currentPlaylist.get('code')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
