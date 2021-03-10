/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from '../components/Breadcrumbs'
import Directory from '../components/Directory'
import Dropdown from '../components/Dropdown'
import File from '../components/File'
import Markdown from '../components/Markdown'

const actions = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// pattern to match all readme files
const readmeRegex = /read(\s+)?me(\.*)?/i

function Code({ peerID, name, defaultBranch }) {
  const dispatch = useDispatch()

  const isDir = useSelector(state => state.file.isDir)
  const content = useSelector(state => state.file.content)
  const entries = useSelector(state => state.file.entries)
  const readme = useSelector(state => state.file.readme)
  const branches = useSelector(state => state.repo.branches)
  
  const [branch, setBranch] = useState(defaultBranch)
  const [path, setPath] = useState('/')

  useEffect(() => {
    dispatch({ type: 'file/fetch', payload: { peerID, name, branch, path } })
    return () => dispatch({ type: 'file/clear' })
  }, [dispatch, peerID, name, branch, path])

  useEffect(async () => {
    const match = entries.find(e => readmeRegex.test(e.name))
    if (match) dispatch({ type: 'file/readme', payload: { peerID, name, branch, path: `${path}/${match.name}` } })
  }, [entries])

  return (
    <React.StrictMode>
      <div css={actions}>
        <Breadcrumbs root={name} path={path} setPath={setPath} />
        <Dropdown label={branch} items={branches} select={setBranch} />
      </div>

      {isDir && <Directory path={path} setPath={setPath} entries={entries} />}
      {content && <File path={path} code={content} />}
      {readme && <Markdown content={readme} />}
    </React.StrictMode>
  )
}

export default Code