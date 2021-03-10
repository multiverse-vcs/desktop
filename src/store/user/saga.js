import { takeLeading, retry, put } from '@redux-saga/core/effects'
import jsonRPC from '../../svc'

function* fetch() {
  try {
    yield put({ type: 'user/fetch/pending' })
    const response = yield retry(30, 1000, jsonRPC, 'Author.Self')
    yield put({ type: 'user/fetch/success', payload: response })
  } catch(err) {
    yield put({ type: 'user/fetch/error', payload: err.message })
  }
}

export default function*() {
  yield takeLeading('app/daemon/up', fetch)
}