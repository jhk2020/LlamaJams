import React, { Component } from 'react';
import CreateForm from './CreateForm';
import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/lib/raised-button';
import { Button, Input } from 'react-materialize';

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Decided to put local state for toggling create form and code input since Home is the only component that uses it, but could always be moved into the store to make it pure
    this.state = {
      showCreateForm: false,
      showJoinForm: false,
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

  showCreateForm = () => {
    this.setState({ showCreateForm: true }, () => {
      $('#start-party-input').focus();
    });
  };

  showJoinForm = () => {
    this.setState({ showJoinForm: true }, () => {
      $('#join-party-input').focus();
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
            { !this.state.showCreateForm ?
              <Button wave='light' className='forms' onClick={this.showCreateForm}>START A JAM</Button>
            : <CreateForm createNewPlaylist={createNewPlaylist} /> }
            { !this.state.showJoinForm ?
              <Button wave='light' className='forms' onClick={this.showJoinForm}>JOIN A JAM</Button>
            : <form className='join-form' onSubmit={this.goToPlaylist}>
                <Input
                  autoComplete='off'
                  id='join-party-input'
                  label='Type in the code'
                  onChange={this.handleCodeChange}
                  placeholder='TYPE IT IN'
                  s={6}
                  type='text'
                  />
              </form> }
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
