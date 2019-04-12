import React from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import App from './App'
import Callback from './Callback'
import Login from './Login'
import HomePage from '../pages/HomePage'
import JoinRoomPage from '../pages/JoinRoomPage'
import RoomPage from '../pages/RoomPage'

const Routes = () => (
	<Router>
		<Callback path="/callback" />
		<Login path="/" />
		<App path="home">
			<HomePage path="home-legacy" />
			<JoinRoomPage path="room/join" />
			<RoomPage path="room/:roomId" />
		</App>
	</Router>
)

export default hot(module)(Routes)
