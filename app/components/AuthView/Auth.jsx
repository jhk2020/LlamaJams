import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPlaylist.get('_id')) {
      this.props.pushState(`/playlist/${nextProps.currentPlaylist.get('code')}`);
    }
  }

  clickHandler() {
    this.setState({
      showForm: true
    });
  }

  render() {
    const { errorMessage, showForm, createNewPlaylist } = this.props;
    return (
      <div className='padded-container'>
        <img src='assets/img/llamalogo.png'/>
        <div>
          <div className='logo-container'>
            { !this.state.showForm ?
              <button className='button-lets-jam' onClick={this.clickHandler.bind(this)}>
                <span className='text-lets-jam'>Start a Jam</span>
              </button>
            : <LoginForm createNewPlaylist={createNewPlaylist} /> }
          </div>
          <div className='guest-container'>
            <form>
              <input type='text' className='input-join-jam' placeholder='JOIN A JAM' ref='playlistCode' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
