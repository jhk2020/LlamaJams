import React, { Component } from 'react';
import PlaylistTrack from './PlaylistTrack';

export default class Queue extends Component {
  render() {
    const { queue, actions, socket } = this.props;
    const queueRender = queue.map(track => (
      <div key={track.get('_id')}>
        <PlaylistTrack socket={socket} track={track} />
      </div>
    ));
    return (
      <div className='queue'>
        { queue.size > 0 ? queueRender : null }
      </div>
    )
  }
}
