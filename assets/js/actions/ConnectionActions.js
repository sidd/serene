import * as ActionTypes from 'actions'
import CredentialsModal from 'components/Credentials/CredentialsModal'
import { buildModal } from './ModalActions'
import { getTorrents } from './TorrentActions'
import { isEmpty } from 'utils'
import { parse } from 'url'
import { selectedConnectionSelector } from 'selectors'

/**
 * Uses `data.provider` to build a connection.
 *
 * @param {Object} data Form data containing connection info.
 * @see   assets/components/Credentials/CredentialsModal
 */
export function createConnection (data) {
  return (dispatch, getState) => {
    const state = getState()
    const host = parse(data.host)

    dispatch({
      type: ActionTypes.CONNECTIONS_CREATE,
      payload: {
        [host.host]: new state.providers[data.provider](data)
      }
    })
    if (isEmpty(selectedConnectionSelector(state))) {
      dispatch({
        type: ActionTypes.CONNECTIONS_SELECT,
        payload: host.host
      })
    }
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
