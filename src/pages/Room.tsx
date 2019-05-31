/** @jsx jsx */

import {
	FC,
	Fragment,
	useContext,
	MouseEvent,
	TouchEvent,
	ComponentProps,
} from 'react'
import { jsx, css } from '@emotion/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { Context as RoomContext } from '../providers/RoomProvider'
import { AttendeeContext } from '../providers/AttendeeProvider'
import { State } from '../state/AttendeeMachine'
import View from '../components/View'

const Room: FC<RouteComponentProps> = () => {
	const room = useContext(RoomContext)
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)

	const stateStrings = attendeeState.toStrings()
	let state: Extract<State, ComponentProps<typeof View>['state']> = 'idle'
	if (stateStrings.length) {
		console.log(stateStrings)
		state = stateStrings[stateStrings.length - 1]
			.split('.')
			.pop() as typeof state
	}

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
		if (attendeeState.matches('authenticated.present.active')) {
			attendeeSend(['YIELD', 'LEAVE'])
		} else {
			attendeeSend('LEAVE')
		}
	}

	if (attendeeState.matches('authenticated.absent')) {
		navigate('/join')
		return <div>loading...</div>
	}
	if (attendeeState.matches('unauthenticated')) {
		navigate('/')
		return <div>loading...</div>
	}

	return (
		<Fragment>
			<div
				onClick={handleStateRepresenationTapped}
				onTouchEnd={handleStateRepresenationTapped}
				css={css`
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
				`}
			>
				<View
					state={state}
					queuePosition={attendeeState.context.queuePosition}
					style={css`
						width: 100%;
						height: 100%;
					`}
				/>
			</div>
			<button
				type="button"
				onClick={handleLeaveRoom}
				css={css`
					position: absolute;
					bottom: 0;
					right: 0;
					margin: 1em;
				`}
			>
				Leave {room.name}
			</button>
		</Fragment>
	)
}

export default Room
