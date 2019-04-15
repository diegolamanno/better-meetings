import React, { FC, useContext } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { Context } from '../providers/AttendeeProvider'

const HomePage: FC<RouteComponentProps> = () => {
	const { state: attendeeState } = useContext(Context)

	return (
		<>
			<h2>Welcome, {attendeeState.context.userId}. let's get you started.</h2>
			<ul>
				<li>
					<Link to="/room/create">Create a Room</Link>
				</li>
				<li>
					<Link to="/room/join">Join a Room</Link>
				</li>
			</ul>
		</>
	)
}

export default HomePage
