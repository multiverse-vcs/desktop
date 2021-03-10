import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'file',
  initialState: {
    loading: false,
    error: null,
    entries: [],
    content: null,
    isDir: false,
    readme: null,
  },
  reducers: {
    'clear': (state) => {
      state.entries = []
      state.content = null
      state.isDir = false
      state.readme = null
    },
    'fetch': (state) => {
      state.entries = []
      state.content = null
      state.isDir = false
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
      state.content = action.payload.content
      state.entries = action.payload.entries || []
      state.isDir = action.payload.is_dir
    },
    'readme/success': (state, action) => {
      state.readme = action.payload.content
    }
  },
})
