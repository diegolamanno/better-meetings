import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import globalStyles from '../styles/variables'

const Layout: FC = ({ children }) => (
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

				body {
					background-color: ${globalStyles.palette.primary};
				}
			`}
		/>
		<section data-section="main-area">{children}</section>
	</>
)

export default Layout
