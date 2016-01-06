import * as ActionTypes from 'actions'

/**
 * state.modal
 *
 * @description Stores the modal and associated data
 * @todo Describe shape
 */
export function modal (state = {}, action) {
  switch (action.type) {
    case ActionTypes.MODAL:
      return Object.assign({}, action.payload)
    case ActionTypes.MODAL_UNSET:
      return {}
    default: return state
  }
}
