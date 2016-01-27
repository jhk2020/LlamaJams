import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: ''
    }
  }

  handleUsernameChange(e) {
    this.setState({
      playlistName: e.target.value
    });
  }

  submitHandler(e) {
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
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input
            className='input-host-jam'
            type='text'
            placeholder='Name your party...'
            value={this.state.playlistName}
            onChange={this.handleUsernameChange.bind(this)} />
        </form>
        {this.props.errorMessage ? <p>{this.props.errorMessage}</p> : null}
      </div>
    )
  }
}
