var React = require('react');
var helpers = require('../../utils/helpers');

var Guest = React.createClass({

  submitHandler: function(e) {
    e.preventDefault();
    var newCode = this.refs.playlistCode.getDOMNode().value;
    this.props.updateCode(newCode);
  },
  render: function() {
    return (
      <div className='guest-container'>
        <form onSubmit={this.submitHandler}>
          <input type='text' className='input-join-jam' placeholder='JOIN A JAM' ref='playlistCode' />
        </form>
      </div>
    );
  }
});

module.exports = Guest;
