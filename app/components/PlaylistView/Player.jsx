import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentTrack && !nextProps.currentStream) {
      this.props.actions.startPlaying();
    }
  }

  render() {
    const { jukeboxPlaying, trackPosition, currentTrack, currentStream, actions } = this.props;
    const { startPlaying, skipSong, togglePlayButton } = actions;
    let picUrl = '';
    if (currentTrack) {
      if (currentTrack.artwork_url) {
        picUrl = currentTrack.artwork_url.replace(/large/, 't300x300');
      }
    }
    return (
      <div>
        {currentTrack ?
          <div className='current-track'>
            <img src={picUrl} />
            <div>{currentTrack.title}</div>
            <div>{currentTrack.user.username}</div>
          </div>
        : null}
        <button onClick={ currentStream ? togglePlayButton : startPlaying }>play</button>
        <button onClick={ skipSong }>skip</button>
      </div>
    )
  }
}
