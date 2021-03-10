import { takeLatest, call, put } from '@redux-saga/core/effects'
import jsonRPC from '../../svc'

function* fetch({ payload }) {
  try {
    yield put({ type: 'file/fetch/pending' })
    const { branch, path } = payload
    const remote = `${payload.peerID}/${payload.name}`
    const response = yield call(jsonRPC, 'File.Search', { remote, branch, path })
    yield put({ type: 'file/fetch/success', payload: response })
  } catch(err) {
    yield put({ type: 'file/fetch/error', payload: err.message })
  }
}

function* readme({ payload }) {
  try {
    yield put({ type: 'file/readme/pending' })
    const { branch, path } = payload
    const remote = `${payload.peerID}/${payload.name}`
    const response = yield call(jsonRPC, 'File.Search', { remote, branch, path })
    yield put({ type: 'file/readme/success', payload: response })
  } catch(err) {
    yield put({ type: 'file/readme/error', payload: err.message })
  }
}

export default function*() {
  yield takeLatest('file/fetch', fetch)
  yield takeLatest('file/readme', readme)
}