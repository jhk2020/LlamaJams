import React, { Component } from 'react';
import Header from '../containers/HeaderContainer';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id='main-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
