/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Code from './Code'
import Empty from './Empty'

const style = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 32px 2rem 0 2rem;
  overflow: auto;
`

function ViewRepo() {
  const dispatch = useDispatch()
  const { peerID, name } = useParams()

  const loading = useSelector(state => state.repo.loading)
  const branches = useSelector(state => state.repo.branches)
  const defaultBranch = useSelector(state => state.repo.defaultBranch)

  useEffect(() => {
    dispatch({ type: 'repo/fetch', payload: { peerID, name } })
    return () => dispatch({ type: 'repo/clear' })
  }, [dispatch, peerID, name])

  if (loading) return (<div></div>)

  return (
    <div css={style}>
      {branches.length === 0 && <Empty peerID={peerID} name={name} />}
      {branches.length !== 0 && <Code peerID={peerID} name={name} defaultBranch={defaultBranch} />}
    </div>
  )
}

export default ViewRepo