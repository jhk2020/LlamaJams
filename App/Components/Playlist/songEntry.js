var React = require('react');
var Search = require('./Search');
var Song = require('./Song');
var Player = require('./Player');
var Firebase = require('firebase');


var SongEntry = React.createClass({

  loadSongsFromServer: function(receivedCode) {


    this.firebaseRef = new Firebase('https://llamajamsauth.firebaseio.com/' + receivedCode + '/playlist');
    console.log(receivedCode);
    console.log("loading songs");

    this.firebaseRef.on('child_added', function(snapshot) {

      var eachSong = snapshot.val()
      var eachTitle = eachSong.title;
      var separateTitleandArtist = eachTitle.indexOf('-')

      var artist = eachTitle.slice(0, separateTitleandArtist)
      var song = eachTitle.slice(separateTitleandArtist + 2, eachTitle.length)

        this.items.push({
          artist: artist,
          song: song,
          songUrl: eachSong.songUrl
        });

      this.setState({songs: this.items})
    }.bind(this));
  },

  rerenderPlaylist: function() {
    this.firebaseRef.on('child_removed', function(snapshot) {
      console.log('inside rerenderPlaylist:', snapshot.val());
      var removeSongbyUrl = snapshot.val().songUrl;

      var isFound = false;
      for(var i = 0; i < this.state.songs.length; i++) {
        if(this.state.songs[i].songUrl === removeSongbyUrl && !isFound) {
          this.state.songs.splice(i,1)
          isFound = true;
        }
      }

      this.setState({
        songs: this.state.songs
      })

      this.forceUpdate();
    }.bind(this));
  },

  getDefaultProps: function() {
    return {
      playlistCode: ''
    }
  },

  getInitialState: function(){
    this.items = [];
    return {
      songs: [],
      active: false,
      input: '',
      searchResults: [],
      toggle: false,
      hasToken: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.state.hasToken = nextProps.hasToken;
    console.log('receiving props:', nextProps.playlistCode);
    var receivedCode = nextProps.playlistCode;
    this.loadSongsFromServer(receivedCode);
    this.rerenderPlaylist();
  },

  handleSearchInput: function(inputSearch) {
    this.setState({
      input: inputSearch
    });
    this.toggleBox();
    this.soundCloudCall(inputSearch)
  },

  toggleBox: function() {
    this.setState({
      active: !this.state.active
    })
  },

  pushSong: function(e) {
    var selectedSong = e.target.childNodes[0].data
    var allResults = this.state.searchResults;

    for(var i = 0; i < allResults.length; i++) {
      if(allResults[i].title === selectedSong) {
        this.firebaseRef.push({
          title: allResults[i].title,
          songUrl: allResults[i].songUrl
        })
      }
    }

   this.toggleBox();
   e.preventDefault();
  },

  playPause: function() {
    var fbref = this.firebaseRef;
    var songs = this.state.songs;
    var player = this;

    var myOptions = {
      onload : function() {
        var duration = this.duration;
        console.log('loaded');
      },
      onfinish : function(){
        //delete first song from firebase
        var children = [];
        fbref.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            children.push(childSnapshot.key().toString());
          })
        });
        fbref.child(children[0]).remove();
        //shift the top song off the playlist array

        // play firstSong
        SC.stream(player.state.songs[0].songUrl, myOptions, function(song) {
          song.play();
        })
         
      },
      onresume : function(){
        console.log("resumed");
      },
      onstop : function(){
        console.log("Stopped");
      },
      onpause : function() {
        console.log('Paused');
      },
      whileplaying : function() {
        console.log(this.position);
      }
    }

    if(!window.soundManager){
      SC.stream(player.state.songs[0].songUrl, myOptions, function(song) {
        song.play();
      })
    }else{
      if(this.state.toggle){
        this.setState({
          toggle: false
        })
        window.soundManager.resumeAll();
        console.log('in resumeAll')
      }else{
        this.setState({
          toggle: true
        })
        window.soundManager.pauseAll();
        console.log('paudAll')
      }
    }

  },

  soundCloudCall: function(inputSearch) {
    if(this.state.searchResults.length > 0) {
      this.setState({ searchResults: this.state.searchResults.slice(0) })
      this.forceUpdate();
    } 

    SC.get('http://api.soundcloud.com/tracks/', { q: inputSearch, limit: 7 }, function(tracks) {
    // Display each song title and an option to add '+' to host playlist
      var obj = [];

      for(var i = 0; i < tracks.length; i++) {
        var eachSong = tracks[i].title;
        var eachUrl = tracks[i].uri;


        obj.push({
          title: eachSong,
          songUrl: eachUrl
        });

        console.log(obj)
       }

      this.setState({ 
        searchResults: obj 
      })

   }.bind(this));

  },

  render: function(){
    console.log('rendered:', this.props.playlistCode);
    var songStructure = this.state.songs.map(function(song, i) {
      return <Song data={song} key={i}/>
    })

    var songResults = this.state.searchResults.map(function(song, i) {
      var songUri = song.songUrl
      return <a className='song-results' href='#' ref='eachSoundcloud' value={songUri}>{song.title}<div className='plus'>+</div></a>
    })

    if(this.state.active) {
      var display = {
        display: 'block'
      }
    } else {
      var display = {
        display: 'none' 
      }
    }

    return (
      <div>
       {this.state.hasToken ? <Player togglePlayer={this.playPause}/> : null}
        <Search checkClick={this.handleSearchInput}/>
        <div className='soundcloud-results' style={display}>
          <div className='song-results' onClick={this.pushSong}>
            {songResults}
          </div>
        </div>
       {songStructure}
      </div>
    );
    
   },

  componentDidMount: function() {
    if (this.props.playlistCode.length > 0) {
      this.loadSongsFromServer(this.props.playlistCode);
      this.rerenderPlaylist();
    }
  }


  });

module.exports = SongEntry;