/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Icon from './Icon'

const style = css`
  display: flex;
`

const main = css`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`

const avatar = css`
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;
`

const id = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ddd;

  &:hover {
    svg {
      display: block;
    }
  }

  svg {
    display: none;
    margin-left: 0.25rem;
  }
`

function Author({ peerID }) {
  return (
    <div css={style}>
      <img css={avatar} />
      <div css={main}>
        <span>Anonymous</span>
        <code css={id} onClick={() => window.electron.copyText(peerID)}>
          {`${peerID.substring(0, 4)}..${peerID.slice(-4)}`}
          <Icon width="12" height="12" name="clipboard" />
        </code>
      </div>
    </div>
  )
}

export default Author