import * as ActionTypes from 'actions'

export function connections (state = {}, action) {
  switch (action.type) {
    case ActionTypes.CONNECTIONS_CREATE:
    case 'PROVIDER_CONNECTION_TEST_PENDING':
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

export function connectionsErrors (state = '', action) {
  switch (action.type) {
    case ActionTypes.CONNECTION_TEST_REJECTED:
      return action.payload
    case 'PROVIDER_CONNECTION_TEST_PENDING':
    case 'PROVIDER_CONNECTION_TEST_FULFILLED':
    case ActionTypes.CONNECTIONS_CREATE:
      return ''
    default: return state
  }
}
