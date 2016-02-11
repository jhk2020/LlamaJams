import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import FontAwesome from 'react-fontawesome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateForm: false,
      codeInput: ''
    }
  }

  clickHandler = () => {
    this.setState({ showCreateForm: true }, () => {
      $('#start-party-form').focus();
    });
  };

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

  handleCodeChange = (e) => {
    this.setState({codeInput: e.target.value});
  };

  render() {
    const { errorMessage, isCreating, isLoading, createNewPlaylist } = this.props;
    return (
      <div id='main' className='wrapper clearfix'>
        {!isCreating ?
          <div className='hello'>
            <div className='llama-logo-container'>
              <img id='llama-logo' src='/static/assets/img/llamalogo.png' />
            </div>
            <div className='forms-container'>
              {!this.state.showCreateForm ?
                <input type='submit'
                  id='start-button'
                  className='forms'
                  value='START A JAM'
                  onClick={this.clickHandler} />
                : <CreateForm createNewPlaylist={createNewPlaylist} />}
                <form onSubmit={this.goToPlaylist}>
                  <input type='text'
                    className='forms'
                    placeholder='JOIN A JAM'
                    autoComplete='off'
                    onChange={this.handleCodeChange}
                    />
                </form>
                { isLoading ?
                  <FontAwesome className='isloading-spinner'
                               name='circle-o-notch'
                               size='2x'
                               spin />
                             : null }
              </div>
          </div>
        : <FontAwesome name='circle-o-notch'
                       size='5x'
                       spin
                       style={{marginTop: '100px'}} />}
      </div>
    )
  }
}
