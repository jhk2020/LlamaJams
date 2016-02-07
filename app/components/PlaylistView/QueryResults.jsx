import React, { Component } from 'react';
import QueriedTrack from './QueriedTrack';

export default class QueryResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: 0,
      headerHeight: 0
    }
  }

  scrollHandler = () => {
    if($('.scrollBox').scrollTop() === $('.scrollBox').prop('scrollHeight') - $('.scrollBox').prop('clientHeight')) {
      this.props.fetchMoreSongs(this.props.searchbarQuery);
    }
  };

  styling = () => {
    var height = this.state.windowHeight - this.state.headerHeight;
    return {
      overflowY: 'auto',
      overflowX: 'none',
      height: this.props.trackResults.size > 0 ? height - 100 + 'px' : null,
      paddingTop: '75px'
    }
  };

  componentDidMount() {
    this.setState({
      windowHeight: $(window).height(),
      headerHeight: $('#header-container').height()
    });
  };

  render() {
    const { trackResults, playlistCode, socket, addTrackToQueueAsync } = this.props;

    return (
      <div className='scrollBox' onScroll={ this.scrollHandler } style={ this.styling() }>
        <div className='track-results'>
          {trackResults.map(track => (
            <QueriedTrack key={track.get('id')}
              track={track}
              playlistCode={playlistCode}
              socket={socket}
              addTrackToQueueAsync={addTrackToQueueAsync} />
          ))}
        </div>
      </div>
    )
  }
}
