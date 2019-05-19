import React, { FC, ComponentType, ReactNode } from 'react'
import { Global, css } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import globalStyles from '../styles/variables'
import NavBar from './Navbar'
import ContentContainer from './ContentContainer'

const Layout: FC<{
	children: ReactNode
}> = ({ children }) => {
	return (
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
			<NavBar />
			<ContentContainer data-section="main-area">{children}</ContentContainer>
		</>
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
