import React, {Component} from 'react';

const QueriedTrack = ({ track, playlistCode, socket }) => {
  let picUrl = '';
  if (track.get('artwork_url')) {
    picUrl = track.get('artwork_url').replace(/large/, 't300x300');
  } else {
    picUrl = '/static/assets/img/kuzco.png';
  }
  function clickHandler() {
    const newTrack = {
      soundCloudId: track.get('id'),
      title: track.get('title'),
      user: track.getIn(['user', 'username']),
      artwork_url: track.get('artwork_url'),
      playlistCode,
      vote: 0
    };
    socket.emit('add track', newTrack);
  }
  return (
    <div className='queried-track-container'>
      <div className='queried-track'>
        <img src={picUrl} className='queried-track-album-cover' />
        <img className='add-track-button' src='/static/assets/img/plus.png' onClick={ clickHandler } />
      </div>
      <div className='queried-track-title'>
        <p>{ track.getIn(['user', 'username']) }</p>
        <p>{ track.get('title') }</p>
      </div>
    </div>
  )
};

export default QueriedTrack;
