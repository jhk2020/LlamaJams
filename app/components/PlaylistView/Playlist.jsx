import React, { Component } from 'react';
import Search from '../../containers/SearchbarContainer';
import QuerySidebar from './QuerySidebar';
import Queue from '../../containers/QueueContainer';
import Player from '../../containers/PlayerContainer';
import { loadPlaylist  } from '../../actions/playlistViewActions/currentPlaylistActions';

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    const { currentPlaylist, socket, receiveSocket, addTrackToQueue, upVote, downVote } = this.props;
    socket.emit('playlist mounted', currentPlaylist.get('code'));
    socket.on('receive socket', socketId => {
      receiveSocket(socketId)
    });
    socket.on('track added', track => {
      addTrackToQueue(track)
    });
    socket.on('track upvoted', trackId => {
      upVote(trackId)}
    );
    socket.on('track downvoted', trackId => {
      downVote(trackId)
    });
  }

  leavePlaylist() {
    socket.emit('leave playlist');
    this.props.leavePlaylist();
  }

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        $('#searchbar-input').focus();
      }
    });
  };

  overlay = (isOpen) => {
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      left: 0,
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    }
  };

  menuWrap = (isOpen) => {
    return {
      position: 'fixed',
      display: !isOpen ? 'none' : 'block',
      left: 0,
      zIndex: 2,
      width: '100%',
      transition: 'all 0.5s'
    };
  };

  render() {
    let el = document.getElementsByClassName('title-home')[0];
    if (el) {
      el.className = 'title-playlist';
    }

    return (
      <div id='main' className='wrapper clearfix'>
        <img id='plus-button' src='assets/img/plus.png' onClick={this.toggleNavbar} />
        <div className='overlay' onClick={this.toggleNavbar} style={this.overlay(this.state.isOpen)}></div>
          <Player />
          <Queue socket={this.props.socket} isOpen={this.state.isOpen} />

          <div className='query-container' style={this.menuWrap(this.state.isOpen)}>
            <QuerySidebar socket={this.props.socket} />
          </div>

      </div>
    );
  }
};

// <div className='menu' style={this.menuWrap(this.state.isOpen)}>
//   <QuerySidebar socket={this.props.socket} />
// </div>

// <div className='playlistcode-container'>
//   <span className='guestcode-span'>
//     GuestCode: {this.props.currentPlaylist.get('code')}
//   </span>
//   <button onClick={this.leavePlaylist} className='leavePlaylist-button'>
//     LEAVE PLAYLIST
//   </button>
// </div>
