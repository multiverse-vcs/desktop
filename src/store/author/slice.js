import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'author',
  initialState: {
    loading: false,
    error: null,
    repositories: [],
    following: [],
  },
  reducers: {
    'clear': (state) => {
      state.repositories = []
      state.following = []
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
      state.repositories = Object.keys(action.payload.author.repositories)
      state.following = action.payload.author.following
    },
  },
})
