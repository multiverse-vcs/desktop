import { buffers, eventChannel } from 'redux-saga'
import { call, put, retry, takeLeading, takeEvery } from 'redux-saga/effects'
import jsonRPC from '../svc'

function createChannel() {
  return eventChannel(emit => {
    window.electron.on('daemon/down', (event, data) => {
      emit({ type: 'app/daemon/down', payload: data })
    })

    window.electron.on('daemon/up', (event, data) => {
      emit({ type: 'app/daemon/up', payload: data })
    })

    window.electron.on('daemon/error', (event, data) => {
      emit({ type: 'app/daemon/error', payload: data })
    })

    const status = window.electron.sendSync('daemon/status')
    if (status) {
      emit({ type: 'app/daemon/up' })
    } else {
      emit({ type: 'app/daemon/down' })
    }

    return () => {
      window.electron.removeAllListeners('daemon/down')
      window.electron.removeAllListeners('daemon/up')
      window.electron.removeAllListeners('daemon/error')
    }
  }, buffers.sliding(100))
}

function* fetch() {
  try {
    yield put({ type: 'app/fetch/pending' })
    const response = yield retry(12, 5000, jsonRPC, 'Author.Self')
    yield put({ type: 'app/fetch/success', payload: response })
  } catch (err) {
    yield put({ type: 'app/fetch/error', payload: err.message })
  }
}

function* broadcast(action) {
  yield put(action)
}

export default function* () {
  const channel = yield call(createChannel)
  yield takeLeading('app/daemon/up', fetch)
  yield takeEvery(channel, broadcast)
}