import React from 'react'
import { Router } from '@reach/router'
import App from './App'
import Callback from './Callback'
import HomePage from '../pages/HomePage'
import CreateRoomPage from '../pages/CreateRoomPage'
import JoinRoomPage from '../pages/JoinRoomPage'

const Routes = () => (
	<Router>
		<Callback path="/callback" />
		<App path="/">
			<HomePage path="home" />
			<CreateRoomPage path="room/create" />
			<JoinRoomPage path="room/join" />
		</App>
	</Router>
)
export default Routes
