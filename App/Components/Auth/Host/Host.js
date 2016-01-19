var React = require('react');

var HostButton = require('./hostbutton');
var InputBar = require('./inputbar');

var Host = React.createClass({

  getInitialState: function() {
    return {
      showButton: true,
      showInputBar: false
    };
  },

  showInput: function() {

    // retrieve token from local storage
    var jwt = window.localStorage.getItem('token');

    //if token exists, take user to playlist
    if (jwt) {
      //take to playlist
    } else {
      this.setState({showButton: false});
      this.setState({showInputBar: true});
    }
  },

  render: function() {
    return (
      <div className='padded-container'>
        <img src='../../assets/img/llamalogo.png'/>
        <div className='logo-container'>
        <div>
          {this.state.showButton ? <HostButton showInput={this.showInput}/> : null}
        </div>

        <div>
          {this.state.showInputBar ? <InputBar {...this.props}/> : null}
        </div>
        </div>
      </div>
    );
  }
});

module.exports = Host;
