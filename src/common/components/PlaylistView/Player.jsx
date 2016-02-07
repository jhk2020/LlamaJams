import React, { Component } from 'react';

export default class Player extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentTrack && !nextProps.currentStream) {
      this.props.actions.startPlaying();
    }
  }

  render() {
    const { jukeboxPlaying, currentTrack, currentStream, isOwner, playlistCode, actions } = this.props;
    const { startPlaying, skipSong, togglePlayButton } = actions;
    let picUrl = '';
    if (currentTrack) {
      if (currentTrack.get('artwork_url')) {
        picUrl = currentTrack.get('artwork_url').replace(/large/, 't300x300');
      }
    }
    const title = currentTrack ? currentTrack.get('title') : null;
    const user = currentTrack ? currentTrack.get('user') : null;

    const placeholder = !currentStream ?
      <div id='image-placeholder' onClick={ isOwner ? startPlaying : null }>
        <img src='/static/assets/img/llama2.png' />
        { isOwner ? <span>Add some songs and click the llama!</span> : <span>Add your songs to the playlist!</span> }
      </div>
    : null;

    return (
        <div className='player'>
          {currentTrack ?
            <div>
              <div id='now-playing'>
                <div className='pic-overlay'></div>
                <img src={picUrl} />
                {isOwner ?
                  <div id="playback-buttons">
                    <img onClick={ togglePlayButton } src={jukeboxPlaying ? '/static/assets/img/pause.png' : '/static/assets/img/play.png'} />
                    <img onClick={ skipSong } src="/static/assets/img/skip.png" />
                  </div>
                  : null}
                <h3 id="now-playing-inner-title">{title}</h3>
              </div>
            </div>
          : placeholder }
          <br/>
          <div id="now-playing-outer-title">
            <h3>{user}</h3>
            <h2>{title}</h2>
          </div>
          <span id='playlist-code'>CODE: { playlistCode }</span>
        </div>
    )
  }
}
