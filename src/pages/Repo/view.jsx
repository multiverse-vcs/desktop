/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Code from '../Code'
import Empty from '../Empty'

const style = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 32px;
  padding: 0 2rem;
  overflow: auto;
`

const link = css`
  text-decoration: none;
`

function View(props) {
  const { peerID, name } = props
  const branches = Object.keys(props.repo.branches)
  
  return (
    <div css={style}>
      <div style={{marginTop: '0.5rem'}}>
        <Link to={`/${peerID}`} css={link}>
          {`${peerID.substring(0, 4)}..${peerID.slice(-4)}`}
        </Link>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <Link to={`/${peerID}/${name}`} css={link}>
          {name}
        </Link>
      </div>
      {branches.length === 0 && <Empty {...props} />}
      {branches.length !== 0 && <Code {...props} />}
    </div>
  )
}

export default View