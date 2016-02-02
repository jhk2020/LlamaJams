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
    const { trackPosition, currentTrack, currentStream, isOwner, actions } = this.props;
    const { startPlaying, skipSong, togglePlayButton } = actions;
    let picUrl = '';
    if (currentTrack) {
      if (currentTrack.get('artwork_url')) {
        picUrl = currentTrack.get('artwork_url').replace(/large/, 't300x300');
      }
    }
    return (
      <div>
        {currentTrack ?
          <div className='current-track'>
            <img src={picUrl} />
            <div>{currentTrack.get('title')}</div>
            <div>{currentTrack.get('user').username}</div>
          </div>
        : null}

        {isOwner ?
          <div>
            <button onClick={ currentStream ? togglePlayButton : startPlaying }>play</button>
            <button onClick={ skipSong }>skip</button>
          </div>
        : null}

      </div>
    )
  }
}
