/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Author from './components/Author'
import Icon from './components/Icon'

const style = (theme) => css`
  display: flex;
  flex-shrink: 0;
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

function View() {
  const peerID = useSelector(state => state.peerID)
  const following = useSelector(state => state.following)
  const repositories = useSelector(state => state.repositories)

  const sorted = (array) => [...array].sort()

  return (
    <div css={style}>
      <div css={inner}>
        <h4 css={heading}>Repositories</h4>
        {repositories && sorted(repositories).map(name =>
          <Link to={`/${peerID}/${name}`} css={item} key={name}>
            <Icon name="book" width="18" height="18" />
            <span>{name}</span>
          </Link>
        )}
        <h4>Following</h4>
        {following && sorted(following).map(id =>
          <Link to={`/${id}`} css={item} key={name}>
            <Icon name="star" width="18" height="18" fill="currentColor" />
            <span>{`${id.substring(0, 4)}..${id.slice(-4)}`}</span>
          </Link>
        )}
      </div>
      <div css={bottom}>
        {peerID && <Author peerID={peerID} />}
      </div>
    </div>
  )
}

export default View