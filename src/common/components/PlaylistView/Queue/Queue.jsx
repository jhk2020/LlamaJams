import React, { Component } from 'react';
import QueueTrack from './QueueTrack';

export default class Queue extends Component {
  queueFix = (isOpen) => {
    return {
      position: isOpen ? 'fixed' : null,
      width: isOpen ? 'null' : '100%'
    }
  };
  
  render() {
    const { queue, actions, socket, isOpen } = this.props;
    const queueRender = queue.map(track => <QueueTrack socket={socket} track={track} key={track.get('_id')}/>);
    return (
      <div id='queue-container' style={this.queueFix(isOpen)}>
        { queue.size > 0 ? queueRender : null }
      </div>
    )
  }
}
