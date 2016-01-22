import React, { Component } from 'react';

const PlaylistTrack = ({ track }) => {
  return (
    <div clasName='playlist-track'>
      <img src={track.artwork_url} />
      <div>
        {track.title}
      </div>
      <br />
    </div>
  )
}

export default PlaylistTrack;
