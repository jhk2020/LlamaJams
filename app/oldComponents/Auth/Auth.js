var React = require('react');
var Host = require('./host/host');
var Guest = require('./guest');

var Auth = React.createClass({

  render: function() {
    return (
      <div>
        <Host {...this.props}/>
        <Guest {...this.props}/>
      </div>
    );
  }
});

module.exports = Auth;
