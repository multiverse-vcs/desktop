/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react'

const list = css`
  display: flex;
  padding: 0;
  list-style-type: none;
  align-items: center;

  li {
    margin-right: 0.75rem;
  }
`

const item = css`
  cursor: pointer;
`

function Breadcrumbs({ root, path, setPath }) {
  return (
    <ol css={list}>
      <li css={item} onClick={() => setPath('/')}>{root}</li>
      {path.split('/').filter(p => p).map((p, i, a) => 
        <React.StrictMode key={p}>
          <li>/</li>
          <li css={item} onClick={() => setPath(a.slice(0, i+1).join('/'))}>{p}</li>
        </React.StrictMode>
      )}
    </ol>
  )
}

export default Breadcrumbs