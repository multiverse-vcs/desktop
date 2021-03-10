import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'repo',
  initialState: {
    loading: false,
    error: null,
    branches: [],
    tags: [],
    defaultBranch: null,
  },
  reducers: {
    'clear': (state) => {
      state.branches = []
      state.tags = []
      state.defaultBranch = null
    },
    'fetch/pending': (state) => {
      state.loading = true
      state.error = null
    },
    'fetch/error': (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    'fetch/success': (state, action) => {
      state.loading = false
      state.error = null
      state.branches = Object.keys(action.payload.repository.branches)
      state.tags = Object.keys(action.payload.repository.tags)
      state.defaultBranch = action.payload.repository.default_branch
    },
  },
})
