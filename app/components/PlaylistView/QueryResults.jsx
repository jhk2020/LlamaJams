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
      height: trackResults.size > 0 ? height + 'px' : null,
      paddingTop: '82px'
    }
  }

  return (
    <div className='scrollBox' onScroll={scrollHandler} style={styling()}>
      <div className='track-results'>
        {trackResults.map(track => (
          <div key={track.get('id')}>
            <QueriedTrack track={track} playlistCode={playlistCode} socket={socket} addTrackToQueueAsync={addTrackToQueueAsync} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default QueryResults;
