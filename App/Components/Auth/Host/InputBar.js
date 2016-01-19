var React = require('react');
var helpers = require('../../../utils/helpers');

var InputBar = React.createClass({

  createData: function(e) {
    e.preventDefault();
    // store host's first name in variable
    var firstname = this.refs.firstname.getDOMNode().value;

    // create playlist and set new data node in firebase
    // returns new playlist code
    var playlistCode = helpers.createPlaylist(firstname);

    // update playlistCode state in Main
    this.props.updateCode(playlistCode);
  },

  render: function() {
    return (
      <form onSubmit={this.createData}>
        <input className='input-host-jam' type='text' placeholder='Playlist Name' ref='firstname'/>
      </form>
    );
  }
});

module.exports = InputBar;
