import * as ActionTypes from 'actions'
import CredentialsModal from 'components/Credentials/CredentialsModal'
import { buildModal } from './ModalActions'
import { getTorrents } from './TorrentActions'
import { parse } from 'url'

/**
 * Uses `data.provider` to build a connection.
 *
 * @param {Object} data Form data containing connection info.
 * @see   assets/components/Credentials/CredentialsModal
 */
export function createConnection (data) {
  return (dispatch, getState) => {
    const state = getState()
    var connectionId

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

    dispatch({
      type: ActionTypes.CONNECTIONS_CREATE,
      payload: {
        [connectionId]: new state.providers[data.provider](data)
      }
    })

    dispatch(selectConnection(connectionId))
  }
}

/**
 * Spawns modal box prompting user to enter connection information.
 */
export function promptConnection (isRequired) {
  return buildModal({
    title: 'Enter connection info',
    body: CredentialsModal,
    required: isRequired === undefined
  })
}

export function selectConnection (conn) {
  return dispatch => {
    dispatch({
      type: ActionTypes.CONNECTIONS_SELECT,
      payload: conn
    })
    dispatch(getTorrents(true, conn))
  }
}
