import React, { Component } from 'react';
import { Input } from 'react-materialize';

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
    return <div className='create-form'>
      <form onSubmit={this.handleSubmit}>
        <Input
            autoComplete='off'
            id='start-party-input'
            onChange={this.handlePlaylistChange}
            label='Name your party'
            placeholder='e.g. DOPE ASS PAHTY'
            type='text'
            value={this.state.playlistName}
        />
      </form>
      {this.props.errorMessage ? <p>{this.props.errorMessage}</p> : null}
    </div>
  }
}
