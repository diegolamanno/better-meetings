import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import { hot } from 'react-hot-loader'
import HelloWorld from './HelloWorld'

const App: FC = () => (
	<>
		<Global
			styles={css`
				html {
					box-sizing: border-box;
				}

				*,
				*::before,
				*::after {
					box-sizing: inherit;
				}
			`}
		/>

		<HelloWorld />
	</>
)

export default hot(module)(App)
