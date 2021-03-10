/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom'
import { jsx, ThemeProvider } from '@emotion/react'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'

const theme = {
  background: {
    primary: '#212529',
    secondary: '#343a40',
    tertiary: '#495057',
  },
  color: {
    primary: '#ffc300',
    secondary: '#ffd60a',
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}