import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Forms = ({showForm, errorMessage, actions}) => {
  const { loginUser, signupUser } = actions;
  return (
    <div>
      {showForm === 'login' ?
        <LoginForm loginUser={loginUser} errorMessage={errorMessage} />
        : <SignUpForm signupUser={signupUser} errorMessage={errorMessage} />
      }
    </div>
  )
}

export default Forms;
