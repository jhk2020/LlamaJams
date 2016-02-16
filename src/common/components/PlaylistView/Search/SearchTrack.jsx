import React, {Component} from 'react';

export default class QueriedTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false
    }
  }

  handleClick = () => {
    const { socket, track, playlistCode } = this.props;
    const newTrack = {
      soundCloudId: track.get('id'),
      title: track.get('title'),
      user: track.getIn(['user', 'username']),
      artwork_url: track.get('artwork_url'),
      playlistCode,
      vote: 0
    };
    socket.emit('add track', newTrack);
    this.setState({added: true});
  };

  render() {
    const { track } = this.props;
    let picUrl = '';
    if (track.get('artwork_url')) {
      picUrl = track.get('artwork_url').replace(/large/, 't300x300');
    } else {
      picUrl = '/static/assets/img/kuzco.png';
    }
    return <div className='queried-track-container'>
      <div className='queried-track'>
        <img src={picUrl} className='queried-track-album-cover' />
        <img
            className='add-track-button'
            onClick={ !this.state.added ? this.handleClick : null }
            src={!this.state.added ? '/static/assets/img/search_plus.png' : '/static/assets/img/search_check.png'}
        />
      </div>
      <div className='queried-track-title'>
        <p>{track.getIn(['user', 'username'])}</p>
        <p>{track.get('title')}</p>
      </div>
    </div>
  }
};
