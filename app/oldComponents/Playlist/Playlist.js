import React, { Component } from 'react';
import SongEntry from './SongEntry';

//basic playlist skeleton for each page
export default class Playlist extends Component {

//logout clears the local storage so that the user is able to redirect to the home and recreate the page
  logout() {
    localStorage.clear();
    location.reload();
  }

  //background color is a state so that it could be used for changing the css when it renders
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#34344d'
    }
  }

  //uses jQuery to set the background-color according to which page you're on
  componentWillMount() {
    debugger;
    // $('body').css('background-color', this.state.backgroundColor);
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
          <SongEntry {...this.props} />
        </div>
      </div>
    );
  }
};
