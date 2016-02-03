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
      <div className='player'>
        {currentTrack ?
          <div>
            <div id='now-playing'>
              <div class='pic-overlay'></div>
              <img src={picUrl} />
              {isOwner ?
                <div id="playback-buttons">
                  <img onClick={ currentStream ? togglePlayButton : startPlaying } src='assets/img/pause.png' />
                  <img onClick={ skipSong } src="assets/img/skip.png" />
                </div>
                : null}
              <h3 id="now-playing-inner-title">{currentTrack.get('title')}</h3>
            </div>
            <div id="now-playing-outer-title">
              <h3>{currentTrack.get('user').username}</h3>
              <h2>{currentTrack.get('title')}</h2>
            </div>
          </div>
        : null}

      </div>
    )
  }
}
