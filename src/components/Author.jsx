/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { Link } from 'react-router-dom'
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;
`

const id = css`
  color: #ddd;
  text-decoration: none;
`

function Author({ peerID }) {
  return (
    <div css={style}>
      <div css={avatar}>
        <Icon name="meh" width="32" height="32" strokeWidth="2" />
      </div>
      <div css={main}>
        <span>Anonymous</span>
        <Link css={id} to={`/${peerID}`}>
          <code>{`${peerID.substring(0, 4)}..${peerID.slice(-4)}`}</code>
        </Link>
      </div>
    </div>
  )
}

export default Author