import React, { FC } from 'react'
import { Router } from '@reach/router'
import Callback from './Callback'

import { Home, Room, Join, NotFound } from '../pages'

const Routes: FC = () => (
	<Router>
		<Home path="/" />
		<Join path="/join" />
		<Room path="/room/:roomId" />
		<Callback path="/callback" />
		<NotFound default />
	</Router>
)

export default Routes
