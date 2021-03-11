/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Icon from './Icon'

const list = css`
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 5px;
  list-style-type: none;
  user-select: none;
`

const item = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  svg {
    margin-right: 1rem;
  }
`

function Directory({ entries, path, setPath }) {
  return (
    <ul css={list}>
      {entries.map(e => 
        <li key={e.name} onClick={() => setPath(`${path}/${e.name}`)} css={item}>
          { e.is_dir === true && <Icon name="folder" width="18" height="18" fill="#79b8ff" stroke="#79b8ff" /> }
          { e.is_dir === false && <Icon name="file" width="18" height="18" fill="#fff" stroke="#666" /> }
          <span>{e.name}</span>
        </li>  
      )}
    </ul>
  )
}

export default Directory