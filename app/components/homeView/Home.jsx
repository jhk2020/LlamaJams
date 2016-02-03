import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      playlistCode: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPlaylist.get('code')) {
      this.props.pushState(`/playlist/${nextProps.currentPlaylist.get('code')}`);
    }
  }

  clickHandler = () => {
    this.setState({
      showForm: true
    });
  };

  goToPlaylist = (e) => {
    e.preventDefault();
    if (this.state.playlistCode !== '') {
      this.props.loadPlaylist(this.state.playlistCode);
    }
  };

  handleCodeChange = (e) => {
    this.setState({
      playlistCode: e.target.value
    });
  };

  render() {
    const { errorMessage, showForm, createNewPlaylist } = this.props;

    return (
      <div id='main' className='wrapper clearfix'>
        <div className='llama-logo-container'>
          <img id='llama-logo' src='assets/img/llamalogo.png'/>
        </div>

        <div className='forms-container'>

          { !this.state.showForm ?
            <input type='submit' className='start-form' value='START A JAM' onClick={this.clickHandler} />
          : <LoginForm createNewPlaylist={createNewPlaylist} /> }

          <form onSubmit={this.goToPlaylist}>
            <input type='text'
              id='join-form'
              placeholder='JOIN A JAM'
              onChange={this.handleCodeChange}
              value={this.state.playlistCode} />
          </form>

        </div>



      </div>
    )
  }
}
