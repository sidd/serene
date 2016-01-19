/* global __providers__ */
import store from 'store'
import * as ActionTypes from 'actions'
import { createConnection } from 'actions/ConnectionActions'

export function getProviders () {
  return dispatch => {
    dispatch({
      type: ActionTypes.PROVIDERS_INITIALIZE,
      payload: __providers__.reduce((obj, cur) => {
        obj[cur.config.id] = cur
        return obj
      }, {})
    })
  }
}

// unused
export function setProvider (active) {
  return {
    type: 'PROVIDERS_SET',
    payload: active
  }
}

/* eslint-disable no-unused-vars */
function __hotUpdateReceived__ (id) {
/* eslint-disable no-unused-vars */
  store.dispatch(createConnection(id))
}
