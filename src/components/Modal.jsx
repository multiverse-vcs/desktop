/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Icon from './Icon'

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.6);
`

const hidden = css`
  display: none;
`

const content = css`
  background: #fff;
  border-radius: 5px;
  width: 400px;
  height: auto;
  padding: 0 1rem 1rem 1rem;
`

const header = css`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`

const close = css`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`

function Modal({ open, setOpen, children }) {
  return (
    <div css={open ? style : hidden}>
      <div css={content}>
        <div css={header}>
          <button css={close} onClick={() => setOpen(false)}>
            <Icon name="x" width="16" height="16" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal