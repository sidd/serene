import AppContainer from 'containers/AppContainer'
import React from 'react'
import store from 'store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

if (module.hot) {
  module.hot.accept()
}

require('styles')

/**
 * Mounts application to `div#mount`. `AppContainer` is wrapped in <Provider />
 * so `connect` can be used in children.
 * @see  http://redux.js.org/docs/basics/UsageWithReact.html#connecting-to-redux
 */
render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('mount')
)
