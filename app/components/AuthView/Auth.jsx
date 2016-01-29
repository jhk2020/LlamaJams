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
      <div className='padded-container'>
        <img src='assets/img/llamalogo.png'/>
        <div>
          <div className='logo-container'>
            { !this.state.showForm ?
              <button className='button-lets-jam' onClick={this.clickHandler}>
                <span className='text-lets-jam'>Start a Jam</span>
              </button>
            : <LoginForm createNewPlaylist={createNewPlaylist} /> }
          </div>
          <div className='guest-container'>
            <form onSubmit={this.goToPlaylist}>
              <input type='text'
                     className='input-join-jam'
                     placeholder='JOIN A JAM'
                     onChange={this.handleCodeChange}
                     value={this.state.playlistCode} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
