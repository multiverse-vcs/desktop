import { takeLatest, call, put } from '@redux-saga/core/effects'
import jsonRPC from '../../svc'

function* fetch({ payload }) {
  try {
    yield put({ type: 'repo/fetch/pending' })
    const params = { remote: `${payload.peerID}/${payload.name}` }
    const response = yield call(jsonRPC, 'Repo.Search', params)
    yield put({ type: 'repo/fetch/success', payload: response })
  } catch(err) {
    yield put({ type: 'repo/fetch/error', payload: err.message })
  }
}

export default function*() {
  yield takeLatest('repo/fetch', fetch)
}