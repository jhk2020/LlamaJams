import React, { Component } from 'react';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    if (!this.state.username) {
      this.setState({
        username: 'Fill in username!'
      });
      return;
    } else if (!this.state.password) {
      this.setState({
        password: 'Fill in password!'
      });
      return;
    }
    this.props.signupUser({
      username: this.state.username,
      password: this.state.password
    });
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input
            className='input-host-jam'
            type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)} />
          <br />
          <input
            className='input-host-jam'
            type='text'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)} />
          <br />
          <input type='submit' value='Post' />
        </form>
        {this.props.errorMessage ? <p>{this.props.errorMessage}</p> : null}
      </div>
    )
  }
}
