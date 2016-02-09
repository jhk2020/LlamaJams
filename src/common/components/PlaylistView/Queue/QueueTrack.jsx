import React, { Component } from 'react';

 export default class PlaylistTrack extends Component {
   constructor(props) {
     super(props);
     this.state = {
       upvoted: 0,
       downvoted: 0
     }
   }

   upVote = () => {
     this.props.socket.emit('upvote track', {
       id: this.props.track.get('_id'),
       playlistCode:  this.props.track.get('playlistCode')
     });
     this.setState({ upvoted: this.state.upvoted++ });
   };

   downVote = () => {
     this.props.socket.emit('downvote track', {
       id: this.props.track.get('_id'),
       playlistCode:  this.props.track.get('playlistCode')
     });
     this.setState({ downvoted: this.state.upvoted-- });
   };

   render() {
     const { track } = this.props;
     return (
       <div className='queue-track wrapper'>
         <img className='queue-track-album-cover' src={track.get('artwork_url')} />
         <div className='queue-track-description'>
           <p className='queue-track-user'>{track.get('user')}</p>
           <p className='queue-track-title'>{track.get('title')}</p>
         </div>
         <div className='vote-buttons'>
           <img src="/static/assets/img/up.png" onClick={ this.state.upvoted < 1 ? this.upVote : null } />
            <p className="vote-number">{track.get('vote')}</p>
            <img src="/static/assets/img/down.png" onClick={ this.state.downvoted > -1 ? this.downVote : null } />
         </div>
       </div>
     )
   }
}
