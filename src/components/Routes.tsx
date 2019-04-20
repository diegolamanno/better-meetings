import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import { RouteComponentProps } from '@reach/router'
import App from './App'
import Callback from './Callback'
import Login from './Login'
import JoinRoomPage from '../pages/JoinRoomPage'
import RoomPage from '../pages/RoomPage'

const NotFound: FC<RouteComponentProps> = () => <div>Sorry, nothing here.</div>

const Routes = () => (
	<Router>
		<Callback path="/callback" />
		<Login path="/" />
		<App path="home">
			<JoinRoomPage path="room/join" />
			<RoomPage path="room/:roomId" />
		</App>
		<NotFound default />
	</Router>
)

export default hot(module)(Routes)
