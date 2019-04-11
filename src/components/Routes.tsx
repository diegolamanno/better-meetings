import React from 'react'
import { Router } from '@reach/router'
import App from './App'
import Callback from './Callback'
import Home from './Home'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

const Routes = () => (
	<Router>
		<App path="/" />
		<Callback path="/callback" />
		<Home path="/" />
		<CreateRoom path="/room/create" />
		<JoinRoom path="/room/join" />
	</Router>
)
export default Routes
