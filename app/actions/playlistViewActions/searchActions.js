export function updateQuery(searchbarQuery) {
  return {
    type: 'UPDATE_QUERY',
    searchbarQuery
  }
}

export function clearQuery() {
  return {
    type: 'CLEAR_QUERY'
  }
}

function updateQueryTracks(results) {
  return {
    type: 'UPDATE_QUERY_TRACKS',
    results
  }
}

export function fetchSongs(searchbarQuery) {
  return dispatch => {
    SC.get('/tracks', {
      q: searchbarQuery,
      limit: 12,
      linked_partitioning: 1
    })
    .then((results) => {
        dispatch(updateQueryTracks(results.collection));
        if (results.next_href) {
          dispatch(saveNextPageUrl(results.next_href));
        } else {
          dispatch(saveNextPageUrl(''));
        }
      });
  }
}

function saveNextPageUrl(url) {
  return {
    type: 'SAVE_NEXT_PAGE_URL',
    url
  }
}

export function fetchMoreSongs(searchbarQuery) {
  return (dispatch, getState) => {
    let { queriedTracks } = getState();
    if (queriedTracks.get('nextPageUrl')) {
      $.get(queriedTracks.get('nextPageUrl'))
        .done((results) => {
          dispatch(updateQueryTracks(results.collection));
          if (results.next_href) {
            dispatch(saveNextPageUrl(results.next_href));
          } else {
            dispatch(saveNextPageUrl(''));
          }
        })
    }
  }
}
