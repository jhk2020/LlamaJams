import React, { Component } from 'react';
import Search from './Search/Search';
import Queue from '../../containers/Playlist/Queue/QueueContainer';
import Player from '../../containers/Playlist/PlayerContainer';
import { loadPlaylist } from '../../actions/playlistViewActions/currentPlaylistActions';

export default class Playlist extends Component {
  static fetchData(params) {
    return loadPlaylist(params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      headerHeight: 0
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

    $('#plus-button-container').click(function() {
      if ($(this).css('transform') == 'none') {
        $(this).css('transform', 'rotate(-45deg)');
      } else {
        $(this).css('transform', '');
      }
    });

    this.setState({headerHeight: $('#header-container').height()});
  }

  leavePlaylist = () => {
    socket.emit('leave playlist');
    this.props.leavePlaylist();
  };

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if ($) {
        if (this.state.isOpen) {
          $('#searchbar-input').focus();
        } else {
          $('#plus-button-container').css('transform', '');
        }
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
      top: this.state.headerHeight + 15,
      position: 'fixed',
      display: !isOpen ? 'none' : 'block',
      left: 0,
      zIndex: 2,
      width: '100%',
      transition: 'all 0.5s'
    };
  };

  render() {
    return (
      <div id='main' className='clearfix'>
        <div id='plus-button-container' onClick={this.toggleNavbar}>
          <img id='plus-button' src='/static/assets/img/plus.png' />
        </div>
        <div className='overlay' onClick={this.state.isOpen ? this.toggleNavbar : null} style={this.overlay(this.state.isOpen)}></div>
        <Player />
        <Queue socket={this.props.socket} isOpen={this.state.isOpen} />

        <div className='query-container' style={this.menuWrap(this.state.isOpen)}>
          <Search socket={this.props.socket} />
        </div>
      </div>
    );
  }
};
