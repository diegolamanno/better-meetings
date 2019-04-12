import React from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import App from './App'
import Callback from './Callback'
import AppSettingsPage from '../pages/AppSettingsPage'
import RoomSettingsPage from '../pages/RoomSettingsPage'
import HomePage from '../pages/HomePage'
import CreateRoomPage from '../pages/CreateRoomPage'
import JoinRoomPage from '../pages/JoinRoomPage'
import RoomPage from '../pages/RoomPage'

const Routes = () => (
	<Router>
		<Callback path="/callback" />
		<App path="/">
			<AppSettingsPage path="settings" />
			<HomePage path="home" />
			<CreateRoomPage path="room/create" />
			<JoinRoomPage path="room/join" />
			<RoomPage path="room/:roomId">
				<RoomSettingsPage path="settings" />
			</RoomPage>
		</App>
	</Router>
)

export default hot(module)(Routes)
