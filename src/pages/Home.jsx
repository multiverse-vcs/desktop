/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useSelector } from 'react-redux'
import Highlight from '../components/Highlight'

const style = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 32px;
  padding: 0 2rem;
  overflow: auto;
`

const panel = css`
  margin-top: 2rem;
  padding: 0 2rem;
  border-radius: 5px;
  background: #fff;
`

function Home() {
  const platform = window.electron.platform
  const path = useSelector(state => state.daemonPath)

  return (
    <div css={style}>
      <div css={panel}>
        <h2>Add the Multiverse binary to your path</h2>
        { platform !== 'win32' && 
          <Highlight>
  {`
  # a symlink will ensure you always have the latest version
  ln -s ${path} /usr/local/bin/multi
  # or for a more permanent solution
  cp ${path} /usr/local/bin/
  `}
          </Highlight>
        }
        { platform === 'win32' &&
          <Highlight>
  {`
  ${path}
  `}
          </Highlight>
        }
      </div>
    </div>
  )
}

export default Home