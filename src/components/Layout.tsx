import React, { FC } from 'react'
import { css } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { NavBar } from '@components'

export const Layout: FC<RouteComponentProps> = ({ children }) => {
	return (
		<div
			css={css`
				display: flex;
				flex-flow: column nowrap;
				min-height: 100vh;
			`}
		>
			<NavBar />
			<main
				data-section="main-area"
				css={css`
					flex-grow: 1;
					position: relative;
				`}
			>
				{children}
			</main>
		</div>
	)
}

export default Layout
