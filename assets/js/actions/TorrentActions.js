import * as ActionTypes from 'actions'
import { connectionsSelectedSelector, selectedTorrentSelector, selectedConnectionSelector } from 'selectors'

export function setTorrent (infohash) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: ActionTypes.TORRENT_SELECT,
      payload: {
        infohash
      }
    })
    if (selectedTorrentSelector(state).infohash !== infohash) {
      dispatch(selectedConnectionSelector(state).getTorrentDetails(infohash))
    }
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
  console.log(connection)
  return (dispatch, getState) => {
    const state = getState()
    if (connection !== connectionsSelectedSelector(state)) {
      return
    }
    dispatch(selectedConnectionSelector(state).getTorrents())
      .payload.promise.then(() => (isRepeating && setTimeout(() => getTorrents(true, connection)(dispatch, getState), 5000)))
  }
}
