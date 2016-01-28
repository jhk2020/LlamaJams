import React, { Component } from 'react';
import PlaylistTrack from './PlaylistTrack';

export default class Queue extends Component {
  render() {
    const { queue, actions, socket } = this.props;
    const queueRender = queue.reverse().map(track => (
      <div key={track.get('id')}>
        <PlaylistTrack socket={socket} track={track} actions={actions} />
      </div>
    ));
    return (
      <div className='queue'>
        { queue.size > 0 ? queueRender : null }
      </div>
    )
  }
}
