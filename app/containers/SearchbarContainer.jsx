import React from 'react';
import { connect } from 'react-redux';
import Searchbar from '../components/PlaylistView/Searchbar';

import { fetchSongs, updateQuery, clearQuery } from '../actions/playlistViewActions/searchActions';

function mapStateToProps(state) {
  return {
    query: state.searchbarQuery
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFromSC: _.debounce(
      (query) => {
        dispatch(fetchSongs(query));
      }, 200
    ),
    performQuery: (event) => {
      dispatch(updateQuery(event.target.value));
    },
    clearSearch: (query) => {
      dispatch(clearQuery(query));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
