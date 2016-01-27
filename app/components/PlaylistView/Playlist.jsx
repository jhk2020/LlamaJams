import React, { Component } from 'react';
import Search from '../../containers/SearchbarContainer';
import QuerySidebar from './QuerySidebar';
import Queue from '../../containers/QueueContainer';
import Player from '../../containers/PlayerContainer';
import { loadPlaylist } from '../../actions/playlistViewActions/queueActions';

export default class Playlist extends Component {
  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    const { currentPlaylist, queue } = getState();
    const playlistCode = currentPlaylist.get('code');
    if (queue.size === 0) {
      return dispatch(loadPlaylist(playlistCode));
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.menuWrap = this.menuWrap.bind(this);
    this.overlay = this.overlay.bind(this);
  }

  componentDidMount() {
    const { currentPlaylist, actions, socket } = this.props;
    socket.emit('playlist mounted', currentPlaylist.get('code'));
    socket.on('receive socket', socketId =>
      actions.receiveSocket(socketId)
    );
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        $('#searchbar-input').focus();
      }
    });
  }

  overlay(isOpen) {
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    }
  }

  menuWrap(isOpen) {
    return {
      position: 'relative',
      float: 'right',
      right: !isOpen ? '-300px' : '0',
      zIndex: 2,
      width: '300px',
      height: '100%',
      transition: 'all 0.5s'
    };
  }

  render() {
    return (
      <div className='music-page'>
        <div className='overlay' onClick={this.toggleNavbar} style={this.overlay(this.state.isOpen)}></div>

        <div className='queue-container'>
          <div className='now-playing'>
            <Player className='player' />
          </div>
          <Queue socket={this.props.socket} />
        </div>

        <div className='playlistcode-container'>
          <span className='guestcode-span'>
            GuestCode: {this.props.playlistCode}
          </span>
          <button onClick={this.logout} className='logout-button'>
            LEAVE PLAYLIST
          </button>
        </div>
        {
          !this.state.isOpen ?
          <div className='menu-icon-container'>
            <img className='menu-icon' src='assets/img/search-white.png' onClick={this.toggleNavbar}/>
          </div>
          :
          null
        }
        <div className='menu' style={this.menuWrap(this.state.isOpen)}>
          <QuerySidebar socket={this.props.socket} />
        </div>
      </div>
    );
  }
};
