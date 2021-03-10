/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const style = css`
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
`

function Icon({ name, width, height, stroke, fill }) {
  return (
    <svg css={style} width={width} height={height} stroke={stroke} fill={fill} >
	  	<use xlinkHref={ `/feather-sprite.svg#${name}` } />
  	</svg>
  )
}

Icon.defaultProps = {
  width: 24,
  height: 24,
  stroke: 'currentColor',
  fill: 'none',
}

export default Icon