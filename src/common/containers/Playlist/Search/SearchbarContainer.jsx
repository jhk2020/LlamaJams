import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Searchbar from '../../../components/PlaylistView/Search/Searchbar';
import * as actionCreators from '../../../actions/playlistViewActions/searchActions';

function mapStateToProps(state) {
  return {
    searchbarQuery: state.searchbarQuery
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
