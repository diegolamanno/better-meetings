import React, { FC, useContext } from 'react'
import { navigate } from '@reach/router'
import { AttendeeContext } from '../providers/AttendeeProvider'

const Home: FC = () => {
	const { state } = useContext(AttendeeContext)
	if (state.matches('authenticated.absent')) {
		navigate('/join')
		return <div>loading...</div>
	}
	if (state.matches('authenticated.present')) {
		navigate('/room')
		return <div>loading...</div>
	}
	return <div>Welcome</div>
}

export default Home
