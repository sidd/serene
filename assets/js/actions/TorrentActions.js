import * as ActionTypes from 'actions'
import { torrentsIsSortedByDescendingSelector, torrentsSortCriteriaSelector, entitiesTorrentsSelector, torrentsItemsSelector, connectionsSelectedSelector, selectedConnectionSelector } from 'selectors'

export function setTorrent (infohash) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch(selectedConnectionSelector(state).getTorrentDetails(infohash))
      .payload.promise.then(() => {
        dispatch({
          type: ActionTypes.TORRENT_SELECT,
          payload: {
            infohash
          }
        })
      })
  }
}

export function unsetTorrent () {
  return {
    type: ActionTypes.TORRENT_DESELECT
  }
}

export function addTorrent (torrent) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedConnectionSelector(state).addTorrent(torrent))
      .payload.promise.then(
        () => dispatch(selectedConnectionSelector(state).getTorrents())
      )
  }
}

export function updateTorrentStatus (infohash, status) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedConnectionSelector(state).updateTorrentStatus(infohash, status))
      .payload.promise.then(
        () => dispatch(selectedConnectionSelector(state).getTorrents())
      )
  }
}

export function removeTorrent (infohash) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedConnectionSelector(state).removeTorrent(infohash))
      .payload.promise.then(
        () => dispatch(selectedConnectionSelector(state).getTorrents())
      )
  }
}

export function getTorrents (isRepeating, connection) {
  return (dispatch, getState) => {
    const state = getState()
    if (connection !== connectionsSelectedSelector(state)) {
      return
    }
    dispatch(selectedConnectionSelector(state).getTorrents()).payload.promise
      .then(() => dispatch(sortTorrents()))
      .then(() => (isRepeating && setTimeout(() => getTorrents(true, connection)(dispatch, getState), 5000)))
  }
}

// this is absurd
// TODO: revisit this
// FIXME: make this less awful
export function sortTorrents (column, order) {
  return (dispatch, getState) => {
    const state = getState()
    const currentlySortingBy = torrentsSortCriteriaSelector(state)
    const columnToSortBy = column || currentlySortingBy || 'name'
    const isSortedByDescending = order || (
      column === currentlySortingBy
        ? !torrentsIsSortedByDescendingSelector(state)
        : torrentsIsSortedByDescendingSelector(state)
    )
    const torrents = entitiesTorrentsSelector(state)
    const torrentsItems = torrentsItemsSelector(state)

    return dispatch({
      type: ActionTypes.TORRENTS_SORT_VISIBLE,
      payload: {
        items: torrentsItems.slice().sort((a, b) => {
          a = torrents[a][columnToSortBy]
          b = torrents[b][columnToSortBy]

          if (!isNaN(+a)) a = +a
          if (!isNaN(+b)) b = +b

          if (a === b) return 0
          return isSortedByDescending
            ? a < b ? 1 : -1
            : a > b ? 1 : -1
        }),
        sortedBy: columnToSortBy,
        isSortedByDescending
      }
    })
  }
}
