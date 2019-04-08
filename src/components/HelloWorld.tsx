/** @jsx jsx */

import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/core'

const HelloWorld: FunctionComponent<{
	name?: string
}> = ({ name }) => (
	<h1
		className="hello-world"
		css={css`
			text-align: center;
		`}
	>
		Hello, {name}!
	</h1>
)

HelloWorld.defaultProps = {
	name: 'world',
}

export default HelloWorld
