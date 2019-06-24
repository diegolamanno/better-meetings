import React, { FC } from 'react'
import { Router } from '@reach/router'
import { Home, Room, Callback, NotFound } from '../pages'
import { Layout } from '@components'

export const Routes: FC = () => (
	<Router>
		<Layout path="/">
			<Home path="/" />
			<Room path="/room" />
			<Callback path={`/${CONFIG.auth.callbackPath}`} />
			<NotFound default />
		</Layout>
	</Router>
)

export default Routes
