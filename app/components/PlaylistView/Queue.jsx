import React, { Component } from 'react';
import PlaylistTrack from './PlaylistTrack';

const Queue = ({ queue }) => {
  return (
    <div className='queue'>
      {queue.map((track) => (
        <div key={track.id}>
          <PlaylistTrack track={track} />
        </div>
      ))}
    </div>
  )
}

export default Queue;
