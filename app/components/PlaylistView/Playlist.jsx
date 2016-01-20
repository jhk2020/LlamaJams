import React, { Component } from 'react';
import Search from '../../containers/SearchbarContainer';

export default class Playlist extends Component {
  logout() {
    localStorage.clear();
    location.reload();
  }

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#34344d'
    }
  }

  componentWillMount() {
    $('body').css('background-color', this.state.backgroundColor);
  }

  render() {
    return (
      <div className='music-page'>
        <div className='playlistcode-container'>
          <span className='guestcode-span'>
            GuestCode: {this.props.playlistCode}
          </span>
          <button onClick={this.logout} className='logout-button'>
            LEAVE PLAYLIST
          </button>
        </div>
        <div className='bigger-container'>
          <Search />
        </div>
      </div>
    );
  }
};
