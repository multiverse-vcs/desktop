import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'app',
  initialState: {
    daemonPath: window.electron.sendSync('daemon/path'),
    daemonStatus: window.electron.sendSync('daemon/status'),
    following: [],
    repositories: [],
    peerID: null,
    loading: false,
    error: null
  },
  reducers: {
    'daemon/up': (state) => {
      state.daemonStatus = true
    },
    'daemon/down': (state) => {
      state.daemonStatus = false
    },
    'fetch/pending': (state) => {
      state.loading = true
      state.error = null
    },
    'fetch/success': (state, action) => {
      state.loading = false
      state.following = action.payload.author.following || []
      state.repositories = Object.keys(action.payload.author.repositories)
      state.peerID = action.payload.peerID
    },
    'fetch/error': (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    'repo/create': (state, action) => {
      state.repositories = [...state.repositories, action.payload]
    },
    'author/follow': (state, action) => {
      state.following = [...state.following, action.payload]
    },
    'author/unfollow': (state, action) => {
      state.following = state.following.filter(f => f !== action.payload)
    }
  }
})
