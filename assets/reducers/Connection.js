import * as ActionTypes from 'actions'

export function connections (state = {}, action) {
  switch (action.type) {
    case ActionTypes.CONNECTIONS_CREATE:
      return Object.assign({}, state, action.payload)
    default: return state
  }
}

export function selectedConnection (state = '', action) {
  switch (action.type) {
    case ActionTypes.CONNECTIONS_SELECT:
      return action.payload
    default: return state
  }
}
