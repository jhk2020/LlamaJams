import React from 'react';
import { connect } from 'react-redux';

import Queue from '../components/PlaylistView/Queue';

function mapStateToProps(state) {
  return {
    queue: state.queue
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (track) => {
      // dispatch(upVote(track));
    },
    downVote: (track) => {
      // dispatch(downVote(track));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
