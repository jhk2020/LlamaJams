import React, { Component } from 'react';
import { connect } from 'react-redux';
import Forms from './Forms';

export default class Home extends Component {
  clickHandler(formType) {
    const { actions } = this.props;
    actions.showForm(formType);
  }

  render() {
    const { isFetching, errorMessage, showForm, actions } = this.props;
    return (
      <div className='padded-container'>
        <img src='assets/img/llamalogo.png'/>
        {showForm === '' ?
          <div>
            <div className='logo-container'>
              <button className='button-lets-jam' onClick={this.clickHandler.bind(this, 'login')}>
                <span className='text-lets-jam'>Log In</span>
              </button>
              <br/>
              <button className='button-lets-jam' onClick={this.clickHandler.bind(this, 'signup')}>
                <span className='text-lets-jam'>Sign Up</span>
              </button>
            </div>
            <div className='guest-container'>
              <form>
                <input type='text' className='input-join-jam' placeholder='JOIN A JAM' ref='playlistCode' />
              </form>
            </div>
          </div>
        : <Forms errorMessage={errorMessage} showForm={showForm} actions={actions} /> }
      </div>
    )
  }
}
