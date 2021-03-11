/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Icon from '../../components/Icon'
import jsonRPC from '../../svc'

const style = css`
  flex: 1;
  margin-top: 32px;
  padding: 2rem;
  overflow: auto;
`

const panel = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
`

const item = css`
  display: flex;
  flex-direction: column;
  color: black;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`

const button = css`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  max-width: 200px;
  background: #fca311;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
  }
`

function View({ peerID, author }) {
  const dispatch = useDispatch()
  const isFollowing = useSelector(state => state.following.includes(peerID))
  const repositories = Object.keys(author.repositories)
  const following = author.following

  const sorted = (array) => [...array].sort()

  const follow = async () => {
    try {
      const response = await jsonRPC('Author.Follow', { peerID })
      dispatch({ type: 'app/author/follow', payload: peerID })
    } catch(err) {
      console.log(err)
    }
  }

  const unfollow = async () => {
    try {
      const response = await jsonRPC('Author.Unfollow', { peerID })
      dispatch({ type: 'app/author/unfollow', payload: peerID })
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div css={style}>
      <div css={panel}>
        <h1>Anonymous</h1>
        <code>{peerID}</code>
        { isFollowing === false && 
          <button css={button} onClick={() => follow()}>
            <Icon name="star" width="16" height="16" />
            Follow
          </button>
        }
        { isFollowing === true && 
          <button css={button} onClick={() => unfollow()}>
            <Icon name="star" width="16" height="16" fill="currentColor" />
            Unfollow
          </button>
        }
        <h2>Repositories</h2>
        {repositories && sorted(repositories).map(name =>
          <Link to={`/${peerID}/${name}`} css={item} key={name}>
            <span>{name}</span>
          </Link>
        )}
        <h2>Following</h2>
        {following && sorted(following).map(id =>
          <Link to={`/${id}`} css={item} key={name}>
            <span>{`${id.substring(0, 4)}..${id.slice(-4)}`}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default View