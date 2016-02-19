import React from 'react';
import QueueTrack from './QueueTrack';

const Queue = ({ queue, actions, socket, isOpen}) => {
  const queueStyle = (isOpen) => {
    return {
      position: isOpen ? 'fixed' : null,
      width: isOpen ? 'null' : '100%'
    }
  };

  const queueRender = queue.map(track => <QueueTrack socket={socket} track={track} key={track.get('_id')}/>);
  return <div id='queue-container' style={queueStyle(isOpen)}>
    { queue.size > 0 ? queueRender : null }
  </div>
}

export default Queue;
