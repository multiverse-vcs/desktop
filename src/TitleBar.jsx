/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useSelector } from 'react-redux'
import Icon from './components/Icon'

const style = css`
  position: fixed;
  display: flex;
  width: 100%;
  height: 32px;
`

const drag = css`
  flex: 1;
  -webkit-app-region: drag;
`

const windows = css`
  display: flex;
  background: #ddd;
`

const mac = css`
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0 0 13px;
  width: 52px;
  height: 32px;
`

const button = css`
  outline: none;
  padding: 0 0.75rem;
  background: none;
  border: none;

  &:hover {
    background: #aaa;
  }
`

const exit = css`
  &:hover {
    background: #f00;
  }
`

function TitleBar() {
  const platform = useSelector(state => state.app.platform)

  return (
    <div css={style}>
      { platform === 'darwin' && 
        <div css={mac}>
          <Icon width="12" height="12" name="circle" fill="currentColor" />
          <Icon width="12" height="12" name="circle" fill="currentColor" />
          <Icon width="12" height="12" name="circle" fill="currentColor" />
        </div>
      }
      <div css={drag}></div>
      { platform === 'win32' && 
        <div css={windows}>
          <button css={button} onClick={() => window.electron.send('window/minimize')}>
            <Icon name="minus" width="16" height="16" />
          </button>
          <button css={button} onClick={() => window.electron.send('window/maximize')}>
            <Icon name="square" width="16" height="16" />
          </button>
          <button css={[button, exit]} onClick={() => window.electron.send('window/close')}>
            <Icon name="x" width="16" height="16" />
          </button>
        </div>
      }
    </div>
  )
}

export default TitleBar