/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { HashRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Splash from './components/Splash'
import Routes from './Routes'
import SideNav from './SideNav'
import TitleBar from './TitleBar'

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
  const loading = useSelector(state => state.user.loading)
  const isDaemonUp = useSelector(state => state.app.isDaemonUp)
  const ready = isDaemonUp && !loading

  return (
    <HashRouter>
      <TitleBar />
      <div css={wrapper}>
        <SideNav />
        <div css={inner}>
          {ready === true && <Routes />}
          {ready === false && <Splash />}
        </div>
      </div>
    </HashRouter>
  )
}

export default App