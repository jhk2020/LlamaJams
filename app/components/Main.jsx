import React, { Component } from 'react';
import './main.css';

export default class Main extends Component {
  render() {
    return (
      <div className='topbar'>
        <div>LLAMAJAMS</div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
