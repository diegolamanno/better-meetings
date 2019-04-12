/** @jsx jsx */

import { FC, Fragment, useContext } from 'react'
import { jsx, css, Global } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { Context as RoomContext } from '../state/RoomMachine'
import { Context as AttendeeContext, State } from '../state/attendeeMachine'

import UserRoomState from '../components/UserRoomState'

const RoomPage: FC<RouteComponentProps> = () => {
	const roomMachine = useContext(RoomContext)
	const attendeeMachine = useContext(AttendeeContext)
	const roomId = roomMachine.context.id
	const state = roomMachine.state
		.toStrings()
		.pop()!
		.split('.')
		.pop() as State
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
				<div className="state-container">
					<UserRoomState
						state={
							roomMachine.state.matches('subscribed') &&
							attendeeMachine.context.isNext
								? 'next'
								: state
						}
					/>
				</div>
			</div>
		</Fragment>
	)
}

export default RoomPage
