var React = require('react');

var Player = React.createClass({
   getInitialState: function() {
    return {
      play: true,
      pause: false
    }
  },

   playShouldpause: function() {
    this.setState({
      play: !this.state.play,
      pause: !this.state.pause
    })
    this.props.togglePlayer(this.state.play)
  },

   render: function() {
    if(this.state.play) {
      var displayPlay = {
        display: 'block'
      }
      var displayPause = {
        display: 'none'
      }
    } else {
      var displayPlay = {
        display: 'none'
      }
      var displayPause = {
        display: 'block'
      }
    }

     return (
      <div className='player-container'>
        <div className='play-pause'>
          <div className='button-play'>
            <img src='assets/img/button-play.png' width='50' height='50' ref='play' onClick={this.playShouldpause} style={displayPlay}/>
          </div>
          <div className='button-pause' >
            <img src='assets/img/button-pause.png' width='50' height='50' ref='pause' onClick={this.playShouldpause} style={displayPause}/>
          </div>
        </div>
      </div>
      )
    }
});

module.exports = Player;
