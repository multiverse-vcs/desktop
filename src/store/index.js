import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { spawn } from 'redux-saga/effects'
import saga from './saga'
import slice from './slice'

const debug = import.meta.env.MODE === 'development'
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: slice.reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(sagaMiddleware)
    return debug ? middlewares.concat(logger) : middlewares
  }
})

sagaMiddleware.run(function*() {
  yield spawn(saga)
})

export default store