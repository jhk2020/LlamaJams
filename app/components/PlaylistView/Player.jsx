import React, { Component } from 'react';

export default class Player extends Component {
  render() {
    const { jukeboxPlaying, trackPosition, currentTrack, currentStream, actions } = this.props;
    const { startPlaying, playNextTrack, togglePlayButton } = actions;

    return (
      <button onClick={ currentStream ? togglePlayButton : startPlaying }>play</button>
    )
  }
}
