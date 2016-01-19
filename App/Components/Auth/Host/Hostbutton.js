var React = require('react');

var HostButton = React.createClass({
  
  render: function() {
    return (
      <button onClick={this.props.showInput} className='button-lets-jam'> <span className='text-lets-jam'>Lets Jam</span> </button>
    );
  }
});

module.exports = HostButton;
