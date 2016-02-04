import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/homeView/Header';

function mapStateToProps(state) {
  return {
    playlistName: state.currentPlaylist.get('title'),
    url: state.routing.location.pathname
  }
}

export default connect(mapStateToProps)(Header);
