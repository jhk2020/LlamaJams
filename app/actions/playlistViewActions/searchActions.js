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
    SC.get('/tracks', {q: searchbarQuery},
      (results) => {
        dispatch(updateQueryTracks(results));
      }
    )
  }
}
