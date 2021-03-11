import React, { useEffect, useReducer } from 'react'
import { createReducer } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import View from './view'
import jsonRPC from '../../svc'

const initialState = {
  loading: true,
  error: null,
  repo: null,
}

const reducer = createReducer(initialState, {
  'fetch/error': (state, action) => {
    state.loading = false
    state.error = action.payload
    state.repo = null
  },
  'fetch/success': (state, action) => {
    state.loading = false
    state.error = null
    state.repo = action.payload
  }
})

async function fetch(dispatch, remote) {
  try {
    const response = await jsonRPC('Repo.Search', { remote })
    dispatch({ type: 'fetch/success', payload: response.repository })
  } catch (err) {
    dispatch({ type: 'fetch/error', payload: err })
  }
}

function Repo() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { peerID, name } = useParams()

  useEffect(() => {
    fetch(dispatch, `${peerID}/${name}`)
  }, [dispatch, peerID, name])

  if (!state.repo) return (<div></div>)

  return <View peerID={peerID} name={name} {...state} />
}

export default Repo