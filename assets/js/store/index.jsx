import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware())(createStore)

export default createStoreWithMiddleware(rootReducer)
