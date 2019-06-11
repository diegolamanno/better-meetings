/** @jsx jsx */

import { FC, ComponentType, ReactNode } from 'react'
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import NavBar from './Navbar'

const Layout: FC<{
	children: ReactNode
}> = ({ children }) => {
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

export const withLayout = (Wrapped: ComponentType<RouteComponentProps>) => (
	props: RouteComponentProps,
) => (
	<Layout>
		<Wrapped {...props} />
	</Layout>
)
