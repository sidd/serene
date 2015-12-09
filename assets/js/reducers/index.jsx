import { combineReducers } from 'redux'

function torrents (state = {
  items: []
}, action) {
  switch (action.type) {
    case 'INIT_FULFILLED':
      return Object.assign({}, state, { items: action.payload })
    default: return state
  }
}

export default combineReducers({ torrents })
