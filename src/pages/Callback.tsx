import React, { FC, useContext, useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { AuthContext } from '@providers'
import { Loading } from '@components'

// Auth0 sends the user to this route. We'll if they come back with a jwt token.
// we'll authorize and send them to the home route, Otherwise we'll log  the error and do the same.
// This callback component seems trivial, because we're not reading from or writing to a db yet.
// You might load user data from mongodb or firebase in the handleAuthentication function and for those
// cases we'll want to have this loading page because that takes time.

export const Callback: FC<RouteComponentProps> = ({ location }) => {
	const authContext = useContext(AuthContext)
	useEffect(() => {
		if (!authContext.isAuthenticated && location && location.hash) {
			authContext.handleAuthentication()
		} else {
			navigate('/')
		}
	}, [authContext.isAuthenticated, location])

	return <Loading />
}

export default Callback
