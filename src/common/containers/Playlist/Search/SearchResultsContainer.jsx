import React from 'react';
import { connect } from 'react-redux';
import { fetchMoreSongs } from '../../../actions/playlistViewActions/searchActions';
import SearchResults from '../../../components/PlaylistView/Search/SearchResults';


function mapStateToProps(state) {
  return {
    searchbarQuery: state.searchbarQuery,
    trackResults: state.searchTracks.get('trackResults'),
    playlistCode: state.currentPlaylist.get('code')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoreSongs: (searchbarQuery) => {
      dispatch(fetchMoreSongs(searchbarQuery));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
