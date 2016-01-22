import React from 'react';

const QueriedTrack = ({ track, addTrackToPlaylist }) => {
  let picUrl = '';
  if (track.artwork_url) {
    picUrl = track.artwork_url.replace(/large/, 't300x300');
  }
  function clickHandler() {
    addTrackToPlaylist(track);
  }
  return (
    <div className='queried-track'>
      <img src={picUrl} className='querysidebar-artwork' />
      <div className='querysidebar-track-title'>{track.title}</div>
      <button onClick={clickHandler}>Add</button>
    </div>
  )
};

export default QueriedTrack;
