/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from 'react'
import Icon from './Icon'

const style = css`
  position: relative;
  display: inline-block;
`

const button = css`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
`

const menu = css`
  position: absolute;
  right: 0;
  z-index: 10;
  margin: 0;
  min-width: 100px;
  background: #fff;
  list-style-type: none;
  border-radius: 5px;
  padding: 0.25rem;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`

const item = css`
  padding: 0.25rem;
  padding-left: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ddd;
  }
`

function Dropdown({ label, items, select }) {
  const [open, setOpen] = useState(false)

  const click = (item) => {
    select(item)
    setOpen(false)
  }

  return (
    <div css={style}>
      <button css={button} onClick={() => setOpen(!open)}>
        <span style={{marginRight: 10}}>{label}</span>
        <Icon name="chevron-down" width="14" height="14" />
      </button>
      {open && 
        <ul css={menu}>
          {items.map(i =>
            <li css={item} key={i} onClick={() => click(i)}>{i}</li>  
          )}
        </ul>
      }
    </div>
  )
}

export default Dropdown