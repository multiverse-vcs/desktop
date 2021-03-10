import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'app',
  initialState: {
    isDaemonUp: window.electron.sendSync('daemon/status'),
    platform: window.electron.platform
  },
  reducers: {
    'daemon/up': (state) => {
      state.isDaemonUp = true
    },
    'daemon/down': (state) => {
      state.isDaemonUp = false
    },
  }
})
