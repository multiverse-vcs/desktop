/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState, useEffect } from 'react'
import 'highlight.js/styles/monokai.css'

const style = css`
  font-size: 1.125rem;
  
  code {
    border-radius: 5px;
  }
`

function Highlight({ children }) {
  const [syntax, setSyntax] = useState(null)

  useEffect(() => {
    const worker = new Worker('worker/highlight.js')
    worker.onmessage = (event) => { setSyntax(event.data) }
    worker.postMessage(children)
    return () => worker.terminate()
  }, [children])

  return (
    <pre css={style}>
      <code className="hljs" dangerouslySetInnerHTML={{__html: syntax}}></code>
    </pre>
  )
}

export default Highlight