import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

type RoomProps = RouteComponentProps<{ roomId: string }>

const RoomPage: FC<RoomProps> = props => {
	const { roomId } = props
	return (
		<>
			<p>welcome to the room: {roomId}!</p>
		</>
	)
}

export default RoomPage
