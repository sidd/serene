import * as ActionTypes from 'actions'

/**
 * state.providers
 *
 * @description Stores loaded providers.
 *              Providers are stored outside of `entities`, since providers are
 *              functions (or objects, if instantiated), and are not
 *              normalized.
 * @todo        Evaluate this approach.
 */
export function providers (state = {}, action) {
  switch (action.type) {
    case ActionTypes.PROVIDERS_INITIALIZE:
      return Object.assign({}, state, action.payload)
    default: return state
  }
}
