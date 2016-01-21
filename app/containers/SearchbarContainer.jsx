import React from 'react';
import { connect } from 'react-redux';
import Searchbar from '../components/PlaylistView/Searchbar';

import { fetchSongs, updateQuery, clearQuery } from '../actions/playlistViewActions/searchActions';

function mapStateToProps(state) {
  return {
    searchbarQuery: state.searchbarQuery
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFromSC: (searchbarQuery) => {
      dispatch(fetchSongs(searchbarQuery));
    },
    updateQuery: (event) => {
      dispatch(updateQuery(event.target.value));
    },
    clearSearch: (searchbarQuery) => {
      dispatch(clearQuery(searchbarQuery));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
