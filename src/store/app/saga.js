import { buffers, eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

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

export default function*() {
  const channel = yield call(createChannel)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}