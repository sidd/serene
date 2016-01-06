import * as ActionTypes from 'actions'
import { initialState } from 'reducers'
import { normalize } from 'normalizr'
import { Schemas } from 'schemas'

/**
 * state.torrents
 *
 * @description stores array of `infohash`es which are used to select
 *              torrents from state.entities
 */
export function torrents (state = initialState, action) {
  switch (action.type) {
    case 'PROVIDER_TORRENTS_FULFILLED':
      return Object.assign({}, state, { items: normalize(action.payload, Schemas.TORRENT_ARRAY).result })
    default: return state
  }
}

/**
 * state.selectedTorrent
 *
 * @description stores `infohash` of selected torrent
 * @todo store Array of `infohash`es (multi-select)
 */
export function selectedTorrent (state = initialState, action) {
  switch (action.type) {
    case 'PROVIDER_TORRENTS_DETAILS_PENDING':
      return Object.assign({}, state, { isFetching: true, didInvalidate: false })
    case ActionTypes.TORRENT_SELECT:
    case 'PROVIDER_TORRENTS_DETAILS_FULFILLED':
      return Object.assign({}, state, { isFetching: false, didInvalidate: false, item: action.payload.infohash })
    case ActionTypes.TORRENT_DESELECT:
      return initialState
    default: return state
  }
}