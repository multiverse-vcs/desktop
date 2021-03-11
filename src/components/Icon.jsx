/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const style = css`
  stroke-linecap: round;
  stroke-linejoin: round;
`

function Icon({ name, ...rest }) {
  return (
    <svg css={style} {...rest} >
	  	<use xlinkHref={ `./feather-sprite.svg#${name}` } />
  	</svg>
  )
}

Icon.defaultProps = {
  width: 24,
  height: 24,
  strokeWidth: 1,
  stroke: 'currentColor',
  fill: 'none',
}

export default Icon