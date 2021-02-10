import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootSaga from './modules/rootSaga'
import rootReducer from './modules/rootReducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IState {}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

export default store
