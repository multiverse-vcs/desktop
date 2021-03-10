/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Author from '../components/Author'
import Icon from '../components/Icon'

const style = (theme) => css`
  display: flex;
  color: white;
  background: ${theme.background.secondary};
  width: 200px;
  flex-direction: column;
  padding-top: 32px;
  overflow: hidden;
  user-select: none;
`

const inner = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem;
  overflow: auto;
`

const bottom = (theme) => css`
  padding: 1rem;
  flex-shrink: 0;
  background: ${theme.background.tertiary};
`

const heading = css`
  margin: 1rem 0;
`

const item = css`
  display: flex;
  color: white;
  align-items: center;
  text-decoration: none;
  margin: 0.5rem 0;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;

  border: none;
  outline: none;
  background: none;

  svg {
    margin-right: 1rem;
  }
`

function ViewAuthor() {
  const dispatch = useDispatch()
  const { peerID } = useParams()

  const repositories = useSelector(state => state.author.repositories)
  const following = useSelector(state => state.author.following)

  useEffect(() => {
    dispatch({ type: 'author/fetch', payload: { peerID } })
    return () => dispatch({ type: 'author/clear' })
  }, [dispatch, peerID])

  return (
    <div css={style}>
      <div css={inner}>
        <h4 css={heading}>Anonymous</h4>
        <button css={item}>
          <Icon name="clipboard" width="18" height="18" />
          <span>{`${peerID.substring(0, 4)}..${peerID.slice(-4)}`}</span>
        </button>
        <button css={item}>
          <Icon name="star" width="18" height="18" />
          <span>Follow</span>
        </button>
        <h4 css={heading}>Repositories</h4>
        {repositories && repositories.map(name => 
          <Link to={`/${peerID}/${name}`} css={item} key={name}>
            <Icon name="book" width="18" height="18" />
            <span>{ name }</span>
          </Link>  
        )}
        <h4>Following</h4>
        {following && following.map(f => <div key={f}>{f}</div>)}
      </div>
      <div css={bottom}>
        <Author peerID={peerID} />
      </div>
    </div>
  )
}

export default ViewAuthor