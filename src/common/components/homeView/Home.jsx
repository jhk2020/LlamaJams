import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false,
      codeInput: ''
    }
  }

  clickHandler = () => {
    this.setState({ showLoginForm: true }, () => {
      $('#start-party-form').focus();
    });
  };

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.currentPlaylist.get('code')) {
      document.activeElement.blur();
      this.props.moveTo(`/playlist/${nextProps.currentPlaylist.get('code')}`);
    }
  }

  goToPlaylist = (e) => {
    debugger;
    e.preventDefault();
    if (this.state.codeInput !== '') {
      this.props.loadPlaylist(this.state.codeInput);
    }
  };

  handleCodeChange = (e) => {
    this.setState({codeInput: e.target.value});
  };

  render() {
    const { errorMessage, currentPlaylist, createNewPlaylist } = this.props;
    const playlistCode = currentPlaylist.get('playlistCode');

    return (
      <div id='main' className='wrapper clearfix'>
        <div className='llama-logo-container'>
          <img id='llama-logo' src='/static/assets/img/llamalogo.png' />
        </div>
        <div className='forms-container'>
          {!this.state.showLoginForm ?
            <input type='submit'
                   id='start-button'
                   className='forms'
                   value='START A JAM'
                   onClick={this.clickHandler} />
          : <LoginForm createNewPlaylist={createNewPlaylist} />}
          <form onSubmit={this.goToPlaylist}>
            <input type='text'
                   className='forms'
                   placeholder='JOIN A JAM'
                   autoComplete='off'
                   onChange={this.handleCodeChange}
                   value={playlistCode} />
          </form>
        </div>
      </div>
    )
  }
}
