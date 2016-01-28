import React, {Component} from 'react';

const QueriedTrack = ({ track, playlistCode, socket, addTrackToQueue }) => {
  let picUrl = '';
  if (track.get('artwork_url')) {
    picUrl = track.get('artwork_url').replace(/large/, 't300x300');
  }
  function clickHandler() {
    const newTrack = {
      id: track.get('id'),
      title: track.get('title'),
      user: track.getIn(['user', 'username']),
      artwork_url: track.get('artwork_url'),
      playlistCode,
      vote: 0
    };
    socket.emit('add track', newTrack);
    addTrackToQueue(newTrack);
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
