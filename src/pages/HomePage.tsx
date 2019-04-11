import React, { FC } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import Live from '../components/Live'

const HomePage: FC<RouteComponentProps> = () => (
	<>
		<h2>Welcome, let's get you started.</h2>
		<ul>
			<li>
				<Link to="/room/create">Create a Room</Link>
			</li>
			<li>
				<Link to="/room/join">Join a Room</Link>
			</li>
			<Live />
		</ul>
	</>
)

export default HomePage
