/** @jsx jsx */

import { FC, Fragment, useContext, SyntheticEvent } from 'react'
import { jsx, css, Global } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { Context as RoomContext } from '../state/RoomMachine'
import { Context as AttendeeContext, State } from '../state/AttendeeMachine'

import UserRoomState from '../components/UserRoomState'

const RoomPage: FC<RouteComponentProps> = () => {
	const roomMachine = useContext(RoomContext)
	const attendeeMachine = useContext(AttendeeContext)
	const roomId = roomMachine.context.name
	const parsedState = roomMachine.state
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

	let state = parsedState
	if (roomMachine.state.matches('queued')) {
		if (roomMachine.context.attendees[0].id === attendeeMachine.context.id) {
			state = 'up'
		} else if (
			roomMachine.context.attendees.length >= 2 &&
			roomMachine.context.attendees[1].id === attendeeMachine.context.id
		) {
			state = 'next'
		}
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
					<UserRoomState state={state} />
				</div>
			</div>
		</Fragment>
	)
}

export default RoomPage
