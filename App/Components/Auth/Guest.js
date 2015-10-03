var React = require('react');
var helpers = require('../../utils/helpers');

var Guest = React.createClass({


	submitHandler: function(e) {
    e.preventDefault();
		var newCode = this.refs.playlistCode.getDOMNode().value;
		console.log('GUEST CODE:', newCode);
		this.props.updateCode(newCode);
	},

  submitHandler: function(e) {
    e.preventDefault();
    var newCode = this.refs.playlistCode.getDOMNode().value;
    console.log('GUEST CODE:', newCode);
    this.props.updateCode(newCode);
  },


  render: function() {
    return (
      <div>
        <h1>Guest</h1>
        <form onSubmit={this.submitHandler}>
        	<input type='text' placeholder='Playlist Code' ref='playlistCode'/>
        </form>
      </div>
    );
  }
});

module.exports = Guest;
