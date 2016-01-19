import React, { Component } from 'react';
import Auth from './auth/auth';
import Playlist from './playlist/playlist';
import helpers from '../utils/helpers';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuth: true,
      showPlaylist: false,
      playlistCode: '',
      check: false,
      hasToken: false,
      backgroundColor: '#d0c490'
    }
    this.showInput = this.showInput.bind(this);
    // this.updateCode = this.updateCode.bind(this);
  }

  // function to check which component (playlist or auth) should be rendered
  showInput(){
    // retrieve token from local storage
    var jwt = window.localStorage.getItem('token');
    // if token exists, take user to playlist
    if (jwt) {
      // change trigger state
      this.setState({hasToken: true, showAuth: false, showPlaylist: true});

      // authenticate token
      helpers.authHost(jwt)
        .then(function(data) {
          // save playlist code as state, to be transferred down to children component as property
          this.setState({playlistCode: data.auth.playlistCode});
        }.bind(this))
        .catch(function(err) {
          console.error(err);
        })

    } else {
      console.log('NO TOKEN FOUND');
      var playlistCode = this.state.playlistCode;
      helpers.checkCode()
      .then(function(snapshot) {
        // iterate through array of playlists(objects)
        for (var code in snapshot.val()) {
          // if it matches the playlist code, render playlist view
          if (code === playlistCode) {
          this.setState({check: false, showAuth: false, showPlaylist: true});
          }
        }
      }.bind(this));
    }
  }

  updateCode(newCode) {
    // change playlist code and re-render main component
    this.setState({playlistCode: newCode}, function() {
      this.showInput();
    });
  }

  componentWillMount() {
    this.showInput();
    $('body').css('background-color', this.state.backgroundColor);
  }

  render() {
    return (
      <div className='home-page'>
        <div className='bigger-container'>
        <div className='align-container'>
        <div>
          {this.state.showAuth  ? <Auth updateCode={this.updateCode.bind(this)}/> : null}
        </div>

        <div>
          {this.state.showPlaylist ? <Playlist hasToken={this.state.hasToken} playlistCode={this.state.playlistCode}/> : null}
        </div>
        </div>
      </div>
      </div>
    )
  }
};
