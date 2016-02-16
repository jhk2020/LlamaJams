import React, { Component } from 'react';

export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: ''
    }
  }

  handlePlaylistChange = (e) => {
    this.setState({
      playlistName: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.playlistName) {
      this.setState({
        playlistName: 'Fill in username!'
      });
      return;
    }
    this.props.createNewPlaylist(this.state.playlistName);
    this.setState({
      playlistName: ''
    });
  };

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <input
            autoComplete='off'
            className='forms'
            id='start-party-form'
            onChange={this.handlePlaylistChange}
            placeholder='Name your party...'
            type='text'
            value={this.state.playlistName}
        />
      </form>
      {this.props.errorMessage ? <p>{this.props.errorMessage}</p> : null}
    </div>
  }
}
