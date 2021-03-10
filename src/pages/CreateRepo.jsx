/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import jsonRPC from '../svc'

const form = css`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`

const input = css`
  outline: none;
  border: none;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  background: #ddd;
`

const button = css`
  border: none;
  outline: none;
  padding: 0.5rem;
  color: #fff;
  background: #55a630;
  border-radius: 5px;
`

const red = css`
  color: red;
`

function CreateRepo() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const method = !!url ? 'Repo.Import' : 'Repo.Create'
      const response = await jsonRPC(method, { name, url })
      
      dispatch({ type: 'user/repository/create', payload: name })
      history.push(`/${response.remote}`)

      setName('')
      setUrl('')
    } catch(err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form css={form} onSubmit={submit}>
      {error && <p css={red}>{error}</p>}
      <label>Repository name</label>
      <input type="text" css={input} disabled={loading} value={name} onChange={e => setName(e.target.value)} />
      <label>Import URL (optional)</label>
      <input type="text" css={input} disabled={loading} value={url} onChange={e => setUrl(e.target.value)} />
      <button type="submit" css={button} disabled={loading}>
        Create Repository
      </button>
    </form>
  )
}

export default CreateRepo