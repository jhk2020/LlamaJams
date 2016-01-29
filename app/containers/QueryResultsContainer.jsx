import React from 'react';
import { connect } from 'react-redux';

import { fetchMoreSongs } from '../actions/playlistViewActions/searchActions';
import { addTrackToQueueAsync } from '../actions/playlistViewActions/querybarActions';
import QueryResults from '../components/PlaylistView/QueryResults';


function mapStateToProps(state) {
  return {
    searchbarQuery: state.searchbarQuery,
    trackResults: state.queriedTracks.get('trackResults'),
    playlistCode: state.currentPlaylist.get('code')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoreSongs: (searchbarQuery) => {
      dispatch(fetchMoreSongs(searchbarQuery));
    },
    addTrackToQueueAsync: (track, playlistCode) => {
      dispatch(addTrackToQueueAsync(track, playlistCode));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
