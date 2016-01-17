import * as ActionTypes from 'actions'

export function getProviders () {
  return dispatch => {
    var req = require
      .context('lib/node_modules', true, /^((?![\\/]node_modules|vendor|test[\\/]).)*SerenePlugin\.js$/)
    var keys = req.keys()
    var providers = keys.map(module => req(module))

    dispatch({
      type: ActionTypes.PROVIDERS_INITIALIZE,
      payload: providers.reduce((obj, cur) => {
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
