import React, { Component } from 'react';
import QueriedTrack from './QueriedTrack';

const QueryResults = ({ trackResults, searchbarQuery, playlistCode, socket, fetchMoreSongs, addTrackToQueueAsync }) => {
  function scrollHandler() {
    if($('.scrollBox').scrollTop() === $('.scrollBox').prop('scrollHeight') - $('.scrollBox').prop('clientHeight')) {
      fetchMoreSongs(searchbarQuery);
    }
  }

  function styling () {
    var height = $(window).height() - $('#header-container').height();
    return {
      overflowY: 'auto',
      overflowX: 'none',
      height: trackResults.size > 0 ? height - 100 + 'px' : null,
      paddingTop: '75px'
    }
  }

  return (
    <div className='scrollBox' onScroll={scrollHandler} style={styling()}>
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

export default QueryResults;
