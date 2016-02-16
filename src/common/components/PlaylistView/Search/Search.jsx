import React from 'react';
import Searchbar from '../../../containers/Playlist/Search/SearchbarContainer';
import SearchResults from '../../../containers/Playlist/Search/SearchResultsContainer';

const QuerySidebar = (props) => {
  <div>
    <Searchbar />
    <SearchResults {...props} />
  </div>
}

export default QuerySidebar;
