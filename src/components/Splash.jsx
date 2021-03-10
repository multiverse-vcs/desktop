/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Icon from './Icon'

const style = (theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: ${theme.background.primary};
`

function Splash() {
  return (
    <div css={style}>
      <Icon name="meh" width="64" height="64" />
    </div>
  )
}

export default Splash