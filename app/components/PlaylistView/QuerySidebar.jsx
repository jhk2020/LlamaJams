import React, { Component } from 'react';
import Searchbar from '../../containers/SearchbarContainer';
import QueryResults from '../../containers/QueryResultsContainer';

export default class QuerySidebar extends Component {

  render() {
    return (
      <div>
        <Searchbar />
        <QueryResults />
      </div>
    )
  }
}
