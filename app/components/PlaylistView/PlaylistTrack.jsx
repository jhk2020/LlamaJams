import React, { Component } from 'react';

 export default class PlaylistTrack extends Component {
   constructor(props) {
     super(props);
     this.state = {
       upvoted: false,
       downvoted: false
     }
   }

   upVote = () => {
     this.props.socket.emit('upvote track', {
       id: this.props.track.get('_id'),
       playlistCode:  this.props.track.get('playlistCode')
     });
     this.setState({ upvoted: true });
   };

   downVote = () => {
     this.props.socket.emit('downvote track', {
       id: this.props.track.get('_id'),
       playlistCode:  this.props.track.get('playlistCode')
     });
     this.setState({ downvoted: true });
   };

   render() {
     const { track } = this.props;
     return (
       <div clasName='playlist-track'>
         <img src={track.get('artwork_url')} />
         <div>
           {track.get('title')}
         </div>
         <div>{track.get('vote')}</div>
         <button onClick={ !this.state.upvoted ? this.upVote : null }>upVote</button>
         <button onClick={ !this.state.downvoted ? this.downVote : null }>downVote</button>
         <br />
       </div>
     )
   }
}
