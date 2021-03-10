import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { spawn } from 'redux-saga/effects'
import app from './app'
import author from './author'
import file from './file'
import repo from './repo'
import user from './user'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    app: app.reducer,
    author: author.reducer,
    file: file.reducer,
    repo: repo.reducer,
    user: user.reducer
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware()
    return middlewares.concat(sagaMiddleware, logger)
  }
})

sagaMiddleware.run(function*() {
  yield spawn(app.saga)
  yield spawn(author.saga)
  yield spawn(file.saga)
  yield spawn(repo.saga)
  yield spawn(user.saga)
})

export default store