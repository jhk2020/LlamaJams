import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <div>
        <form>
          <input className='input-host-jam' type='text' placeholder='Username' ref='firstname'/>
          <br/>
          <input className='input-host-jam' type='text' placeholder='Password' />
        </form>
      </div>
    )
  }
}
