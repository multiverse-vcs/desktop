import { takeLatest, call, put } from '@redux-saga/core/effects'
import jsonRPC from '../../svc'

function* fetch({ payload }) {
  try {
    yield put({ type: 'author/fetch/pending' })
    const params = { peerID: payload.peerID }
    const response = yield call(jsonRPC, 'Author.Search', params)
    yield put({ type: 'author/fetch/success', payload: response })
  } catch(err) {
    yield put({ type: 'author/fetch/error', payload: err.message })
  }
}

export default function*() {
  yield takeLatest('author/fetch', fetch)
}