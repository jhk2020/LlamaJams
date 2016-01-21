import React from 'react';

const Track = ({ track, addTrackToPlaylist }) => {
  var picUrl = '';
  if (track.artwork_url) {
    picUrl = track.artwork_url.replace(/large/, 'crop');
  }
  return (
    <div className='track'>
      <img src={picUrl} className='querysidebar-artwork' />
      <div className='querysidebar-track-title'>{track.title}</div>
      <button onClick={addTrackToPlaylist}>Add</button>
    </div>
  )
};

export default Track;
