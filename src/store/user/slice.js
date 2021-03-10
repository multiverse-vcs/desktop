import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    following: [],
    peerID: null,
    repositories: [],
  },
  reducers: {
    'repository/create': (state, action) => {
      state.repositories = [...state.repositories, action.payload]
    },
    'fetch/pending': (state) => {
      state.loading = true
      state.error = null
    },
    'fetch/success': (state, action) => {
      state.loading = false
      state.following = action.payload.author.following
      state.peerID = action.payload.peerID
      state.repositories = Object.keys(action.payload.author.repositories)
    },
    'fetch/error': (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
