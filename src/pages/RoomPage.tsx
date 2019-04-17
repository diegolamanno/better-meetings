/** @jsx jsx */

import { FC, Fragment, useContext, MouseEvent, TouchEvent } from 'react'
import { jsx, css, Global } from '@emotion/core'
import { navigate } from '@reach/router'
import { Context as RoomContext } from '../providers/RoomProvider'
import { Context as AttendeeContext } from '../providers/AttendeeProvider'
import { State } from '../state/AttendeeMachine'

import UserRoomState from '../components/UserRoomState'

const RoomPage: FC<import('@reach/router').RouteComponentProps> = () => {
	const room = useContext(RoomContext)
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)
	const roomId = room.name
	const stateString = attendeeState
		.toStrings()
		.pop()!
		.split('.')
		.pop() as State

	const handleStateRepresenationTapped = (
		e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
	) => {
		e.preventDefault()
		if (attendeeState.matches('authenticated.present')) {
			attendeeSend(
				attendeeState.matches('authenticated.present.idle') ? 'QUEUE' : 'YIELD',
			)
		}
	}

	const handleLeaveRoom = () => {
		attendeeSend('LEAVE')
	}

	if (!attendeeState.matches('authenticated.present')) {
		navigate('/home/room/join')
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
			<button type="button" onClick={handleLeaveRoom}>
				Leave room
			</button>
		</Fragment>
	)
}

export default RoomPage
