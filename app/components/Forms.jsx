import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Forms = ({showForm, errorMessage, actions}) => {
  const { loginUser } = actions;
  return (
    <div>
      {showForm === 'login' ?
        <LoginForm loginUser={loginUser} errorMessage={errorMessage} />
        : <SignUpForm />
      }
    </div>
  )
}

export default Forms;
