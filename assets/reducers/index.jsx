import deepAssign from 'deep-assign'
import { combineReducers } from 'redux'
import { selectedConnection, connections } from './Connection'
import { modal } from './Modal'
import { normalize } from 'normalizr'
import { Schemas } from 'schemas'
import { providers } from './Provider'
import { selectedTorrent, torrents, torrentsToUpload } from './Torrent'

/**
 * Initial state that asynchronous reducer keys should utilize.
 *
 * @field {Boolean} isFetching Whether the request is currently in progress.
 * @field {Boolean} didInvalidate Whether the request has been invalidated,
 *                  possibly due to data being out-of-date.
 */
export const initialState = {
  isFetching: false,
  didInvalidate: true
}

/**
 * state.entities
 *
 * @description Stores normalized entities pertaining to the selected provider
 * @todo        Handle multiple providers
 * @todo        Divide into sub-entities so that data isn't trashed
 *              every time a provider is switched
 */
function entities (state = {}, action) {
  switch (action.type) {
    case 'PROVIDER_STATS_FULFILLED':
      return Object.assign({}, state, normalize(action.payload, Schemas.STATS).entities)
    case 'PROVIDER_TORRENTS_FULFILLED':
      return deepAssign({}, state, normalize(action.payload, Schemas.TORRENT_ARRAY).entities)
    case 'PROVIDER_TORRENTS_DETAILS_FULFILLED':
      return deepAssign({}, state, normalize(action.payload, Schemas.TORRENT).entities)
    default: return state
  }
}

/**
 * Composes & keys reducers onto one beautiful state.
 */
export default combineReducers({
  entities,
  selectedTorrent, torrents, torrentsToUpload,
  selectedConnection, connections,
  providers,
  modal
})
