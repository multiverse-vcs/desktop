import React from 'react'
import { createReducer } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import { useEffect, useReducer } from 'react'
import View from './view'
import jsonRPC from '../../svc'

const initialState = {
  loading: true,
  error: null,
  author: null,
}

const reducer = createReducer(initialState, {
  'fetch/error': (state, action) => {
    state.loading = false
    state.error = action.payload
    state.author = null
  },
  'fetch/success': (state, action) => {
    state.loading = false
    state.error = null
    state.author = action.payload
  }
})

async function fetch(dispatch, peerID) {
  try {
    const response = await jsonRPC('Author.Search', { peerID })
    dispatch({ type: 'fetch/success', payload: response.author })
  } catch (err) {
    dispatch({ type: 'fetch/error', payload: err })
  }
}

function Author() {
  const { peerID } = useParams()
  const [state, dispatch] = useReducer(reducer, initialState)

  // fetch author when peer ID is updated
  useEffect(() => {
    fetch(dispatch, peerID)
  }, [dispatch, peerID])

  if (!state.author) return (<div></div>)

  return <View peerID={peerID} {...state} />
}

export default Author