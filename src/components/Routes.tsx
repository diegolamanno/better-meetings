import React from 'react'
import { Router } from '@reach/router'
import Auth from '../auth/Auth'
import history from '../history'
import App from './App'
import Callback from './Callback'

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
	</Router>
)
export default Routes
