/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Icon from './components/Icon'
import Modal from './components/Modal'
import CreateRepo from './pages/CreateRepo'
import Search from './pages/Search'

const wrapper = (theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme.background.primary};
  overflow: hidden;
  width: 80px;
  height: calc(100% - 32px);
  overflow: hidden;
  padding-top: 32px;
`

const item = css`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  width: 50px;
  height: 50px;
`

function Navigation() {
  const history = useHistory()
  const peerID = useSelector(state => state.peerID)

  const [searchModal, setSearchModal] = useState(false)
  const [createRepoModal, setCreateRepoModal] = useState(false)

  // close all modals on route change
  history.listen(() => {
    setCreateRepoModal(false)
    setSearchModal(false)
  })

  return (
    <div css={wrapper}>
      <Link to={`/${peerID}`} css={item}>
        <Icon name="globe" width="24" height="24" />
      </Link>
      <button css={item} onClick={() => setCreateRepoModal(true)}>
        <Icon name="plus" width="24" height="24" />
      </button>
      <button css={item} onClick={() => setSearchModal(true)}>
        <Icon name="search" width="24" height="24" />
      </button>
      <Modal open={createRepoModal} setOpen={setCreateRepoModal}>
        <CreateRepo />
      </Modal>
      <Search open={searchModal} setOpen={setSearchModal} />
    </div>
  )
}

export default Navigation