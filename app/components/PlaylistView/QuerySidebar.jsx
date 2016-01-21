import React, { Component } from 'react';
import Searchbar from '../../containers/SearchbarContainer';
import QueriedTracks from '../../containers/QueriedTracksContainer';

export default class QuerySidebar extends Component {

  render() {
    return (
      <div>
        <Searchbar />
        <QueriedTracks />
      </div>
    )
  }
}
