import React, { Component } from 'react';
import PlaylistTrack from './PlaylistTrack';


export default class Queue extends Component {
  render() {
    const { queue, actions } = this.props;
    const queueRender = queue.reverse().map(track => (
      <div key={track.get('id')}>
        <PlaylistTrack {...props} track={track} upVote={actions.upVote} downVote={actions.downVote} />
      </div>
    ));
    return (
      <div className='queue'>
        { queue.size > 0 ? queueRender : null }
      </div>
    )
  }
}
