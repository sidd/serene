/* eslint-disable new-cap */

import * as ActionTypes from 'actions'
import CredentialsModal from 'components/Credentials/CredentialsModal'
import { buildModal, unsetModal } from './ModalActions'
import { getTorrents } from './TorrentActions'
import { parse } from 'url'
import { connectionsSelectedSelector, connectionsSelector } from 'selectors'

/**
 * Uses `data.provider` to build a connection.
 *
 * @param {Object} data Form data containing connection info.
 * @see   assets/components/Credentials/CredentialsModal
 */
export function createConnection (data, cb) {
  return (dispatch, getState) => {
    const state = getState()
    var connectionId, connection

    // HMR goodness
    if (typeof data === 'function') {
      const currentConnections = connectionsSelector(state)

      Object.keys(currentConnections).forEach(conn => {
        if (currentConnections[conn].config.id === data.config.id) {
          dispatch({
            type: ActionTypes.CONNECTIONS_CREATE,
            payload: {
              [conn]: new data(currentConnections[conn].opts)
            }
          })
        }
      })

      dispatch(selectConnection(connectionsSelectedSelector(state), false))
    } else if (data) {
      if (data.host) {
        const host = parse(data.host)
        connectionId = host.href
      } else {
        connectionId = data.provider
      }

      // removes slashes from end of str when generating connectionId
      // has no effect on the actual host connected to
      while (/\/$/.test(connectionId)) {
        connectionId = connectionId.slice(0, -1)
      }
      connection = new state.providers[data.provider](data)

      const testFn = connection.testConnection
        ? connection.testConnection.bind(connection, connectionId)
        : () => ({
          type: 'PROVIDER_CONNECTION_TEST_FULFILLED',
          payload: {
            promise: Promise.resolve(true)
          }
        })

      dispatch(testFn()).payload.promise
        .then(res => {
          dispatch({
            type: ActionTypes.CONNECTIONS_CREATE,
            payload: {
              [connectionId]: connection
            }
          })
          dispatch(selectConnection(connectionId))
        }, err => {
          dispatch({
            type: ActionTypes.CONNECTION_TEST_REJECTED,
            payload: err
          })
        })
    }
  }
}

/**
 * Spawns modal box prompting user to enter connection information.
 */
export function promptConnection (isRequired) {
  return buildModal({
    title: 'Add new connection',
    body: CredentialsModal,
    required: isRequired === undefined,
    className: 'modal--connection'
  })
}

export function selectConnection (conn, isRepeating = true) {
  return dispatch => {
    dispatch({
      type: ActionTypes.CONNECTIONS_SELECT,
      payload: conn
    })
    dispatch(unsetModal())
    dispatch(getTorrents(isRepeating, conn))
  }
}
