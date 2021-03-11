import React, { useEffect, useReducer } from 'react'
import { createReducer } from '@reduxjs/toolkit'
import jsonRPC from '../../svc'
import View from './view'

const initialState = {
  loading: true,
  error: null,
  branch: '',
  path: '',
  file: null,
  readme: null
}

const reducer = createReducer(initialState, {
  'setBranch': (state, action) => {
    state.branch = action.payload
  },
  'setPath': (state, action) => {
    state.path = action.payload
  },
  'fetch/error': (state, action) => {
    state.loading = false
    state.error = action.payload
    state.file = null
  },
  'fetch/success': (state, action) => {
    state.loading = false
    state.error = null
    state.readme = null
    state.file = action.payload
  },
  'readme/success': (state, action) => {
    state.readme = action.payload
  },
}) 

async function fetch(dispatch, remote, branch, path) {
  try {
    const response = await jsonRPC('File.Search', { remote, branch, path })
    dispatch({ type: 'fetch/success', payload: response })
  } catch (err) {
    dispatch({ type: 'fetch/error', payload: err })
  }
}

async function readme(dispatch, remote, branch, path) {
  try {
    const response = await jsonRPC('File.Search', { remote, branch, path })
    dispatch({ type: 'readme/success', payload: response })
  } catch (err) {
    dispatch({ type: 'readme/error', payload: err })
  }
}

const readmeRegex = /read(\s+)?me(\.*)?/i

function Code(props) {
  const { peerID, name, repo } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  const setBranch = (value) => dispatch({ type: 'setBranch', payload: value })
  const setPath = (value) => dispatch({ type: 'setPath', payload: value })

  const entries = state.file && state.file.entries

  // reset branch and path when repo is updated
  useEffect(() => {
    setBranch(repo.default_branch)
    setPath('')
  }, [repo])

  // fetch file when repo branch or path is updated
  useEffect(() => {
    fetch(dispatch, `${peerID}/${name}`, state.branch, state.path)
  }, [dispatch, peerID, name, state.branch, state.path])

  // fetch readme when directory entries are updated
  useEffect(() => {
    const match = entries && entries.find(e => readmeRegex.test(e.name))
    match && readme(dispatch, `${peerID}/${name}`, state.branch, `${state.path}/${match.name}`)
  }, [entries])

  return <View setBranch={setBranch} setPath={setPath} {...props} {...state} />
}

export default Code