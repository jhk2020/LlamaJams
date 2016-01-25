import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { goToPlaylist, currentPlaylist } = nextProps;
    if (currentPlaylist.get('_id') !== '') {
      goToPlaylist(currentPlaylist);
    }
  }

  createNewPlaylist(e) {
    e.preventDefault();
    this.props.actions.createNewPlaylist(this.state.input);
  }

  render() {
    const { actions, userPlaylists } = this.props;
    const playlists = userPlaylists.map(playlist => (
      <Link key={playlist.get('_id')}
            to={`/playlist/${playlist.get('_id')}`}
            onClick={actions.setCurrentPlaylist.bind(null, playlist)}
            >{playlist.get('title')}</Link>
    ));
    return (
      <div>
        <div>{playlists}</div>
        <form onSubmit={this.createNewPlaylist.bind(this)}>
          <input placeholder='Start a Jam' value={this.state.input} onChange={event => this.setState({input: event.target.value})} />
        </form>
      </div>
    )
  }

  componentDidMount() {
    this.props.actions.fetchPlaylists();
  }
}
