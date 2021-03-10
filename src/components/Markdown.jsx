/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react'

const wrapper = css`
  background: #fff;
  border-radius: 5px;
  margin: 1rem 0;
  padding: 1rem 2rem;
`

function Markdown({ content }) {
  const [markdown, setMarkdown] = useState(null)

  useEffect(() => {
    const worker = new Worker('worker/marked.js')
    worker.onmessage = (event) => { setMarkdown(event.data) }
    worker.postMessage(content)
    return () => worker.terminate()
  }, [content])

  return (
    <div css={wrapper}>
      <div dangerouslySetInnerHTML={{__html: markdown}}></div>
    </div>
  )
}

export default Markdown