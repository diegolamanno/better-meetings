import React, { FC, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { AuthContext } from '@providers'
import { Button, Loading, JoinRoomForm } from '@components'

export const Home: FC<RouteComponentProps> = () => {
	const authContext = useContext(AuthContext)
	if (!authContext.isAuthenticated && authContext.ready) {
		return <Button onClick={authContext.login}>Login</Button>
	}
	if (!authContext.isAuthenticated && !authContext.ready) {
		return <Loading />
	}

	return <JoinRoomForm />
}

export default Home
