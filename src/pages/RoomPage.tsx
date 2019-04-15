/** @jsx jsx */

import { FC, Fragment, useContext, SyntheticEvent } from 'react'
import { jsx, css, Global } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { Context as RoomContext } from '../providers/RoomProvider'
import { Context as AttendeeContext } from '../providers/AttendeeProvider'
import { State } from '../state/AttendeeMachine'

import UserRoomState from '../components/UserRoomState'

const RoomPage: FC<RouteComponentProps> = () => {
	const room = useContext(RoomContext)
	const { state: attendeeState } = useContext(AttendeeContext)
	const roomId = room.name
	const stateString = attendeeState
		.toStrings()
		.pop()!
		.split('.')
		.pop() as State
	const handleStateRepresenationTapped = (
		e: SyntheticEvent<Element, Event>,
	) => {
		e.preventDefault()
		// TODO handle user's state change
		// console.log('received the request for state change')
	}

	return (
		<Fragment>
			<Global
				styles={css`
					.state-container {
						background-color: #00f;
					}
				`}
			/>
			<div
				css={css`
					height: 100%;
					background-color: #f00;
				`}
			>
				<p>welcome to the room: {roomId}!</p>
				<div
					className="state-container"
					onClick={handleStateRepresenationTapped}
					onTouchEnd={handleStateRepresenationTapped}
				>
					<UserRoomState state={stateString} />
				</div>
			</div>
		</Fragment>
	)
}

export default RoomPage
