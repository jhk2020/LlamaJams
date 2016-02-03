import React, { Component } from 'react';

export default class Main extends Component {
  render() {
    return (
      <div>
        <div id="header-container">
          <header className="wrapper clearfix">
            <h1 className="title-home">L L A M A J A M S</h1>
            <img id="github-logo" src="assets/img/github.png" />
          </header>
        </div>
        <div id='main-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
