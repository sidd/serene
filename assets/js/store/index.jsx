import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore)

export default createStoreWithMiddleware(rootReducer)
