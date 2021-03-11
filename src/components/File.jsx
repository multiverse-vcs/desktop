/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Highlight from './Highlight'

const style = css`
  position: absolute;
  left: 310px;
  right: 30px;
  top: 110px;
  bottom: 30px;
  overflow: auto;
  border-radius: 5px;
  font-size: 1.125rem;

  pre {
    margin: 0;
    height: 100%;
  }

  code {
    padding: 1.5rem;
    width: calc(100% - 3rem);
    height: calc(100% - 3rem);
  }
`

function File({ code }) {
  return (
    <div css={style}>
      <Highlight>{code}</Highlight>
    </div>
  )
}

export default File