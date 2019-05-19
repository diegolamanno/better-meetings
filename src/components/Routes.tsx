import React, { FC } from 'react'
import { Router } from '@reach/router'
import * as pages from '../pages'
import { withLayout } from './Layout'

const Home = withLayout(pages.Home)
const Join = withLayout(pages.Join)
const Room = withLayout(pages.Room)
const NotFound = withLayout(pages.NotFound)
const Callback = pages.Callback

const Routes: FC = () => (
	<Router>
		<Home path="/" />
		<Join path="/join" />
		<Room path="/room/:roomId" />
		<Callback path={`/${CONFIG.auth.callbackPath}`} />
		<NotFound default />
	</Router>
)

export default Routes
