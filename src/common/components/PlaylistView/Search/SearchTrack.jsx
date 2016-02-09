import React, {Component} from 'react';

export default class QueriedTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false
    }
  }

  clickHandler = () => {
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
    this.setState({voted: true});
  };

  render() {
    const { track } = this.props;
    let picUrl = '';
    if (track.get('artwork_url')) {
      picUrl = track.get('artwork_url').replace(/large/, 't300x300');
    } else {
      picUrl = '/static/assets/img/kuzco.png';
    }
    return (
      <div className='queried-track-container'>
        <div className='queried-track'>
          <img src={picUrl} className='queried-track-album-cover' />
          <img className='add-track-button'
               src={!this.state.voted ? '/static/assets/img/search_plus.png' : '/static/assets/img/search_check.png'}
               onClick={ !this.state.voted ? this.clickHandler : null } />
        </div>
        <div className='queried-track-title'>
          <p>{ track.getIn(['user', 'username']) }</p>
          <p>{ track.get('title') }</p>
        </div>
      </div>
    )
  }
};
