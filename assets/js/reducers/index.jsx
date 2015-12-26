import { combineReducers } from 'redux'

function torrents (state = {
  items: {}
}, action) {
  switch (action.type) {
    case 'TORRENTS_FULFILLED':
      return Object.assign({}, state, { items: action.payload })
    default: return state
  }
}

function controllers (state = {
  items: {}
}, action) {
  switch (action.type) {
    case 'CONTROLLERS_FULFILLED':
      return Object.assign({}, state, { items: action.payload })
    case 'CONTROLLER_SET':
      state.active = action.payload.active
      return state
    default: return state
  }
}

export default combineReducers({ controllers, torrents })
