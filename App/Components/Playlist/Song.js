var React = require('react');

var Song = React.createClass({
  render: function() {
    return (
      <div className='container-playlist'>
        <div className='song-view'>
          {this.props.data.song}
        </div>

        <div className='artist-view'>
          {this.props.data.artist}
        </div>

      </div>
    )
  }
})

module.exports = Song;