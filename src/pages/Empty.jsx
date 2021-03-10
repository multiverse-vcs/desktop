/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Highlight from '../components/Highlight'

const style = css`
  margin-top: 2rem;
  padding: 0 2rem;
  border-radius: 5px;
  background: #fff;
`

function Empty({ peerID, name }) {
  return (
    <div css={style}>
      <h3>Create a new repository from the command line</h3>
      <Highlight>
        {`
  multi init
  multi commit -m "initial"
  multi remote create origin ${peerID}/${name}
  multi branch set remote origin
  multi push
        `}
      </Highlight>
      <h3>Push an existing repository from the command line</h3>
      <Highlight>
        {`
  multi remote create origin ${peerID}/${name}
  multi branch set remote origin
  multi push
        `}
      </Highlight>
    </div>
  )
}

export default Empty