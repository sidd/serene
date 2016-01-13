import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from 'reducers'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

/**
 * Allows for Redux store creation using `redux-thunk` and `redux-promise-middleware`
 * @see  https://www.npmjs.com/package/redux-thunk
 * @see  https://www.npmjs.com/package/redux-promise-middleware
 */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware())(createStore)

/**
 * Creates & exports Redux store
 */
export default createStoreWithMiddleware(rootReducer)
