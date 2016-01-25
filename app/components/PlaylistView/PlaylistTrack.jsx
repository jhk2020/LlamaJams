import React, { Component } from 'react';

const PlaylistTrack = ({ track, upVote, downVote }) => {
  return (
    <div clasName='playlist-track'>
      <img src={track.get('artwork_url')} />
      <div>
        {track.get('title')}
      </div>
      <div>{track.get('vote')}</div>
      <button onClick={() => {upVote(track.get('id'))}}>upVote</button>
      <button onClick={() => {downVote(track.get('id'))}}>downVote</button>
      <br />
    </div>
  )
}

export default PlaylistTrack;
