import React from 'react'
import { Router } from '@reach/router'
import Home from './Home'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

const Routes = () => (
	<Router>
		<Home path="/" />
		<CreateRoom path="/room/create" />
		<JoinRoom path="/room/join" />
	</Router>
)
export default Routes
