import React, { Component } from 'react';
import Searchbar from '../../../containers/Playlist/Search/SearchbarContainer';
import SearchResults from '../../../containers/Playlist/Search/SearchResultsContainer';

export default class QuerySidebar extends Component {
  render() {
    return (
      <div>
        <Searchbar />
        <SearchResults {...this.props} />
      </div>
    )
  }
}
