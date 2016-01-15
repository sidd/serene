import * as ActionTypes from 'actions'
import { isEmpty } from 'utils'
import { buildModal } from './ModalActions'
import { torrentsIsSortedByDescendingSelector, torrentsSortCriteriaSelector, entitiesTorrentsSelector, torrentsItemsSelector, connectionsSelectedSelector, selectedConnectionSelector } from 'selectors'
import AddTorrentsModal from 'components/Torrent/AddTorrentsModal'
import parseTorrent from 'parse-torrent'

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

export function unsetTorrentsToUpload () {
  return {
    type: ActionTypes.TORRENTS_TO_UPLOAD_UNSET
  }
}

export function setTorrentsToUpload (torrents) {
  return dispatch => {
    var numTorrents = torrents.length
    var parsedTorrents = []

    torrents.forEach(torrent => {
      parseTorrent.remote(torrent, function (err, parsedTorrent) {
        if (err) return console.error(err)
        parsedTorrents.push(parsedTorrent)

        parsedTorrent.originalFile = torrent

        numTorrents = numTorrents - 1

        if (numTorrents === 0) {
          dispatch({
            type: ActionTypes.TORRENTS_TO_UPLOAD_SET,
            payload: parsedTorrents
          })

          dispatch(buildTorrentsModal())
        }
      })
    })
  }
}

export function buildTorrentsModal (onFilesDrop) {
  return (dispatch, getState) => {
    const state = getState()
    if (isEmpty(state.modal)) {
      return dispatch(buildModal({
        title: 'Add Torrents',
        body: AddTorrentsModal,
        required: false,
        onFilesDrop
      }))
    }
  }
}

export function unsetTorrent () {
  return {
    type: ActionTypes.TORRENT_DESELECT
  }
}

export function addTorrent (torrents, cb) {
  torrents = torrents.map(torrent => torrent.originalFile || torrent)
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedConnectionSelector(state).addTorrent(torrents)).payload.promise
      .then(() => cb && dispatch(cb()))
      .then(
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
          a = standardize(torrents[a][columnToSortBy])
          b = standardize(torrents[b][columnToSortBy])

          if (a === b) return 0
          return isSortedByDescending
            ? a < b ? 1 : -1
            : a > b ? 1 : -1
        }),
        sortedBy: columnToSortBy,
        isSortedByDescending
      }
    })

    function standardize (item) {
      if (!isNaN(+item)) item = +item
      else if (typeof item === 'string') {
        item = item.toLowerCase()
      }

      return item
    }
  }
}
