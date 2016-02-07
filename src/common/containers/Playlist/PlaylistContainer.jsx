import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import io from 'socket.io-client';
import Playlist from '../../components/PlaylistView/Playlist';
import { receiveSocket } from '../../actions/playlistViewActions/currentPlaylistActions';
import { addTrackToQueue } from '../../actions/playlistViewActions/searchbarActions';
import { upVote, downVote } from '../../actions/playlistViewActions/queueActions';

const socket = io('', { path: '/api/queue'});

function mapStateToProps(state) {
  return {
    currentPlaylist: state.currentPlaylist,
    socket
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveSocket: (socketId) => {
      dispatch(receiveSocket(socketId));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    },
    upVote: (track) => {
      dispatch(upVote(track));
    },
    downVote: (track) => {
      dispatch(downVote(track));
    },
    leavePlaylist: () => {
      dispatch(routeActions.push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
