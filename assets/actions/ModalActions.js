import * as ActionTypes from 'actions'

export function buildModal (opts) {
  return {
    type: ActionTypes.MODAL,
    payload: opts
  }
}

export function unsetModal () {
  return {
    type: ActionTypes.MODAL_UNSET
  }
}
