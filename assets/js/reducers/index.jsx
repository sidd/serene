import { combineReducers } from 'redux'
import { normalize } from 'normalizr'
import { Schemas } from '../schemas'
import deepAssign from 'deep-assign'

const initialState = {
  isFetching: false,
  didInvalidate: true
}

function entities (state = {}, action) {
  switch (action.type) {
    case 'STATS_FULFILLED':
      return Object.assign({}, state, normalize(action.payload, Schemas.STATS).entities)
    case 'CONTROLLERS':
      return Object.assign({}, state, normalize(action.payload, Schemas.CONTROLLER_ARRAY).entities)
    case 'TORRENTS_FULFILLED':
      return deepAssign({}, state, normalize(action.payload, Schemas.TORRENT_ARRAY).entities)
    case 'TORRENTS_DETAILS_FULFILLED':
      return deepAssign({}, state, normalize(action.payload, Schemas.TORRENT).entities)
    default: return state
  }
}

function torrents (state = initialState, action) {
  switch (action.type) {
    case 'TORRENTS_FULFILLED':
      return Object.assign({}, state, { items: normalize(action.payload, Schemas.TORRENT_ARRAY).result })
    default: return state
  }
}

function selectedTorrent (state = initialState, action) {
  switch (action.type) {
    case 'TORRENTS_SET':
      return Object.assign({}, state, { isFetching: true, item: action.payload })
    case 'TORRENTS_DETAILS_FULFILLED':
      return Object.assign({}, state, { isFetching: false, didInvalidate: false })
    case 'UNSET_TORRENT':
      return initialState
    default: return state
  }
}

function selectedController (state = '', action) {
  switch (action.type) {
    case 'CONTROLLERS_SET':
      return action.payload
    default: return state
  }
}

function modal (state = {}, action) {
  switch (action.type) {
    case 'MODAL':
      return Object.assign({}, action.payload)
    case 'MODAL_UNSET':
      return {}
    default: return state
  }
}

export default combineReducers({ entities, selectedTorrent, torrents, selectedController, modal })
