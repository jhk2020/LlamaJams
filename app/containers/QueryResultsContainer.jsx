import React from 'react';
import { connect } from 'react-redux';

import { fetchMoreSongs } from '../actions/playlistViewActions/searchActions';
import { addTrackToQueue } from '../actions/playlistViewActions/queueActions';
import QueryResults from '../components/PlaylistView/QueryResults';


function mapStateToProps(state) {
  return {
    searchbarQuery: state.searchbarQuery,
    trackResults: state.queriedTracks.get('trackResults')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoreSongs: (searchbarQuery) => {
      dispatch(fetchMoreSongs(searchbarQuery));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
