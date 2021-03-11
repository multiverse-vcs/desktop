/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Icon from '../components/Icon'

const style = css`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  color: #fff;
  background-color: rgba(0,0,0,0.6);
`

const inner = css`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 2rem;
`

const hidden = css`
  display: none;
`

const form = css`
  margin-top: 12rem;
  max-width: 700px;
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  background: #ddd;
  border-radius: 5px;
  padding: 0 1rem;
  color: #000;
`

const input = css`
  height: 50px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.25rem;
  background: #ddd;
  padding: 0 1rem;
`

function Search({ open, setOpen }) {
  const history = useHistory()
  const [search, setSearch] = useState('')

  const onKeypress = (event) => {
    if (event.key === 'Escape') setOpen(false)
  }

  const submit = (event) => {
    event.preventDefault()
    history.push(`/${search}`)
    setSearch('')
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeypress)
    return () => window.removeEventListener('keypress', onKeypress)
  }, [])

  return (
    <div css={open ? style : hidden}>
      <div css={inner}>
        <form css={form} onSubmit={submit}>
          <Icon name="search" width="32" height="32" />
          <input css={input} type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
        </form>
        <span>press escape to close</span>
      </div>
    </div>
  )
}

export default Search