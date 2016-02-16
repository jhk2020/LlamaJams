import React, { Component } from 'react';
import SearchTrack from './SearchTrack';

export default class QueryResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: 0,
      headerHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      windowHeight: $(window).height(),
      headerHeight: $('#header-container').height()
    });
  };

  handleScroll = () => {
    if($('.scrollBox').scrollTop() === $('.scrollBox').prop('scrollHeight') - $('.scrollBox').prop('clientHeight')) {
      this.props.fetchMoreSongs(this.props.searchbarQuery);
    }
  };

  scrollBoxStyle = () => {
    var height = this.state.windowHeight - this.state.headerHeight;
    return {
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: this.props.trackResults.size > 0 ? height - 100 + 'px' : null,
      paddingTop: '75px'
    }
  };

  render() {
    const { trackResults, playlistCode, socket } = this.props;
    return <div className='scrollBox' onScroll={ this.handleScroll } style={ this.scrollBoxStyle() }>
      <div className='track-results'>
        {trackResults.map(track => (
          <SearchTrack
              key={track.get('id')}
              playlistCode={playlistCode}
              socket={socket}
              track={track}
          />
        ))}
      </div>
    </div>
  }
}
