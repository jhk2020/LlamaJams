import React, {Component} from 'react';

const QueriedTrack = ({ track, playlistCode, socket, addTrackToQueue }) => {
  let picUrl = '';
  if (track.get('artwork_url')) {
    picUrl = track.get('artwork_url').replace(/large/, 't300x300');
  }
  function clickHandler() {
    const { socket } = this.props;
    const newTrack = {
      title: track.get('title'),
      user: track.user.username,
      playlistCode,
      picUrl
    };
    socket.emit('add track', track);
    addTrackToQueue(track);
  }
  return (
    <div className='queried-track'>
      <img src={picUrl} className='querysidebar-artwork' />
      <div className='querysidebar-track-title'>{track.get('title')}</div>
      <button onClick={clickHandler}>Add</button>
    </div>
  )
};

export default QueriedTrack;
