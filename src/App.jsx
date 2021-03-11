/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from './Navigation'
import Side from './Side'
import Title from './Title'
import Splash from './components/Splash'
import Author from './pages/Author'
import Repo from './pages/Repo'

const wrapper = css`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const inner = css`
  display: flex;
  flex: 1;
  background: #ddd;
  overflow: hidden;
`

function App() {
  const loading = useSelector(state => state.loading)
  const isDaemonUp = useSelector(state => state.isDaemonUp)

  if (!isDaemonUp || loading) return (<Splash />)

  return (
    <HashRouter>
      <Title />
      <div css={wrapper}>
        <Navigation />
        <div css={inner}>
          <Side />
          <Switch>
            <Route path="/:peerID/:name">
              <Repo />
            </Route>
            <Route path="/:peerID">
              <Author />
            </Route>
          </Switch>
        </div>
      </div>
    </HashRouter>
  )
}

export default App