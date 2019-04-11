/** @jsx jsx */

import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/core'

const HelloWorld = data => (
	<h1
		className="hello-world"
		css={css`
			text-align: center;
		`}
	>
		Hello,
	</h1>
	data.map( meeting => <span>{meeting.name}</span>)
)

HelloWorld.defaultProps = {
	name: 'world',
}

export default HelloWorld
