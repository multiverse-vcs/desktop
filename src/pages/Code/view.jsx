/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import Directory from '../../components/Directory'
import Dropdown from '../../components/Dropdown'
import File from '../../components/File'
import Markdown from '../../components/Markdown'

const actions = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function View({ name, branch, repo, setBranch, path, setPath, file, readme }) {
  const branches = Object.keys(repo.branches)

  return (
    <React.StrictMode>
      <div css={actions}>
        <Breadcrumbs root={name} path={path} setPath={setPath} />
        <Dropdown label={branch} items={branches} select={setBranch} />
      </div>

      {file && file.is_dir && <Directory path={path} setPath={setPath} entries={file.entries} />}
      {file && !file.is_dir && <File path={path} code={file.content} />}
      {readme && <Markdown content={readme.content} />}
    </React.StrictMode>
  )
}

export default View