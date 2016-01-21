import React, { Component } from 'react';
import Track from './Track';

const QueriedTracks = ({ trackResults, searchbarQuery, fetchMoreSongs, addTrackToPlaylist }) => {
  function scrollHandler() {
    if($('.scrollBox').scrollTop() === $('.scrollBox').prop('scrollHeight') - $('.scrollBox').prop('clientHeight')) {
      fetchMoreSongs(searchbarQuery);
    }
  }

  function styling () {
    var height = $(window).height() - 82;
    return {
      overflowY: 'auto',
      overflowX: 'none',
      height: height + 'px',
      paddingTop: '82px',
      width: '300px'
    }
  }

  return (
    <div className='scrollBox' onScroll={scrollHandler} style={styling()}>
      <div className='track-results'>
        {trackResults.map(track => (
          <div key={track.id}>
            <Track track={track} addTrackToPlaylist={addTrackToPlaylist} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default QueriedTracks;
