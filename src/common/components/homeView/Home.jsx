import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import FontAwesome from 'react-fontawesome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Decided to put local state for toggling create form and code input since Home is the only component that uses it, but could always be moved into the store to make it pure
    this.state = {
      showCreateForm: false,
      codeInput: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlistCode) {
      document.activeElement.blur();
      this.props.moveTo(`/playlist/${nextProps.playlistCode}`);
    }
  }

  goToPlaylist = (e) => {
    e.preventDefault();
    if (this.state.codeInput !== '') {
      this.props.loadPlaylist(this.state.codeInput);
    }
  };

  handleClick = () => {
    this.setState({ showCreateForm: true }, () => {
      $('#start-party-form').focus();
    });
  };

  handleCodeChange = (e) => {
    this.setState({codeInput: e.target.value});
  };

  render() {
    const { errorMessage, isCreating, isLoading, createNewPlaylist } = this.props;
    return <div id='main' className='wrapper clearfix'>
      {!isCreating ?
        <div className='hello'>
          <div className='llama-logo-container'>
            <img id='llama-logo' src='/static/assets/img/llamalogo.png' />
          </div>
          <div className='forms-container'>
            {!this.state.showCreateForm ?
              <input
                  className='forms'
                  id='start-button'
                  onClick={this.handleClick}
                  type='submit'
                  value='START A JAM'
              />
              : <CreateForm createNewPlaylist={createNewPlaylist} />
            }
            <form onSubmit={this.goToPlaylist}>
              <input
                  autoComplete='off'
                  className='forms'
                  onChange={this.handleCodeChange}
                  placeholder='JOIN A JAM'
                  type='text'
              />
            </form>
            { isLoading ?
              <FontAwesome
                  className='isloading-spinner'
                  name='circle-o-notch'
                  size='2x'
                  spin
              />
              : null }
          </div>
        </div>
      : <FontAwesome
            name='circle-o-notch'
            size='5x'
            spin
            style={{marginTop: '100px'}}
        />
      }
    </div>
  }
}
