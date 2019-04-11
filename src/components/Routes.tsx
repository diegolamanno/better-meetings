import React from 'react'
import { Router } from '@reach/router'
import Auth from '../auth/Auth'
import history from '../history'
import App from './App'
import Callback from './Callback'
import Home from './Home'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication()
	}
}

const Routes = () => (
	<Router history={history}>
		<App path="/" auth={auth} />
		<Callback path="/callback" />
		<Home path="/" />
		<CreateRoom path="/room/create" />
		<JoinRoom path="/room/join" />
	</Router>
)
export default Routes
