import React from 'react';
import { connect } from 'react-redux';

import { fetchMoreSongs } from '../actions/playlistViewActions/searchActions';
import { addTrackToPlaylist } from '../actions/playlistViewActions/playlistActions';
import QueryResults from '../components/PlaylistView/QueryResults';


function mapStateToProps(state) {
  console.log(state)
  return {
    searchbarQuery: state.searchbarQuery,
    trackResults: state.queriedTracks.trackResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoreSongs: (searchbarQuery) => {
      dispatch(fetchMoreSongs(searchbarQuery));
    },
    addTrackToPlaylist: (track) => {
      dispatch(addTrackToPlaylist(track));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);