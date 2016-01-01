import { selectedTorrentSelector, selectedControllerSelector } from '../selectors'

export function setTorrent (infohash) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'TORRENTS_SET',
      payload: infohash
    })
    if (selectedTorrentSelector(state).infohash !== infohash) {
      dispatch(selectedControllerSelector(state).getTorrentDetails(infohash))
    }
  }
}

export function unsetTorrent () {
  return {
    type: 'UNSET_TORRENT'
  }
}

export function addTorrent (torrent) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedControllerSelector(state).addTorrent(torrent))
      .payload.promise.then(
        () => dispatch(selectedControllerSelector(state).getTorrents())
      )
  }
}

export function updateTorrentStatus (infohash, status) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedControllerSelector(state).updateTorrentStatus(infohash, status))
      .payload.promise.then(
        () => dispatch(selectedControllerSelector(state).getTorrents())
      )
  }
}

export function removeTorrent (infohash) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedControllerSelector(state).removeTorrent(infohash))
      .payload.promise.then(
        () => dispatch(selectedControllerSelector(state).getTorrents())
      )
  }
}

export function getTorrents (isRepeating) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedControllerSelector(state).getTorrents())
      .payload.promise.then(() => (isRepeating && setTimeout(() => getTorrents(true)(dispatch, getState), 1000)))
  }
}
