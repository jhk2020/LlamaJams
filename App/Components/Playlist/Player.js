var React = require('react');

var Player = React.createClass({
  //the play and pause have booleans as their values to toggle display and hide
   getInitialState: function() {
    return {
      play: true,
      pause: false
    }
  },

  //when playShouldpause is invoked, the play should turn into a pause button
  //the pause should turn into a play button
   playShouldpause: function() {
    this.setState({
      play: !this.state.play,
      pause: !this.state.pause
    })
  //calls the parent songEntry with the props 'togglePlayer' 
  //passes in the current state as an argument
    this.props.togglePlayer(this.state.play)
  },
   render: function() {
  //these are used to create style properties for the images
  //this.state.play means that the play button should show, and the pause button should hide
    if(this.state.play) {
      var displayPlay = {
        display: 'block'
      }
      var displayPause = {
        display: 'none'
      }
    } 
  //else is used for when pause is currently at display, so that it could show the pause and hide the play
    else {
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
