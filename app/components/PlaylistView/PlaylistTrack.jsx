import React, { Component } from 'react';

const PlaylistTrack = ({ socket, track, actions }) => {
  function upVote(trackId, playlistCode) {
    let track = { trackId, playlistCode };
    socket.emit('upvote track', track);
    actions.upVote(trackId);
  }
  function downVote(trackId) {
    socket.emit('downvote track', track);
    actions.downVote(trackId);
  }
  return (
    <div clasName='playlist-track'>
      <img src={track.get('artwork_url')} />
      <div>
        {track.get('title')}
      </div>
      <div>{track.get('vote')}</div>
      <button onClick={() => {upVote(track.get('id'), track.get('playlistCode'))}}>upVote</button>
      <button onClick={() => {downVote(track.get('id'), track.get('playlistCode'))}}>downVote</button>
      <br />
    </div>
  )
}

export default PlaylistTrack;
