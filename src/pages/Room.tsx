import React, { FC, Fragment, useContext, MouseEvent, TouchEvent } from 'react'
import { css } from '@emotion/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { variables as styleVars } from '@styles'
import { RoomContext, AttendeeContext } from '@providers'
import { getInitials } from '../utilities'

export const Room: FC<RouteComponentProps> = () => {
	const room = useContext(RoomContext)
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)

	const handleInteract = (
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
		navigate('/')
		return <div>loading...</div>
	}
	if (attendeeState.matches('unauthenticated')) {
		navigate('/')
		return <div>loading...</div>
	}

	const queued = attendeeState.matches('authenticated.present.active.queued')
	const nextUp = attendeeState.matches('authenticated.present.active.nextUp')
	const hasFloor = attendeeState.matches(
		'authenticated.present.active.hasFloor',
	)

	const queueAhead =
		attendeeState.context.queuePosition &&
		room.queue.splice(attendeeState.context.queuePosition)

	const avatarScale = 80

	const flexPercentage = avatarScale / (queueAhead ? queueAhead.length : 1)
	const borderWidth = flexPercentage / 75
	const fontSize = flexPercentage / 5

	return (
		<Fragment>
			<div
				onClick={handleInteract}
				onTouchEnd={handleInteract}
				css={[
					css`
						justify-content: space-around;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						display: flex;
						position: absolute;
						flex-flow: column nowrap;
						align-items: center;
						background-color: ${styleVars.colors.idle};

						@media (orientation: landscape) {
							flex-direction: row;
						}

						.avatar {
							flex: 0 1 ${flexPercentage}vmax;
							display: block;
							border-radius: 50%;
							background-color: #fff;
							overflow: hidden;
							border: ${borderWidth}vmin solid #000;
							color: #000;
							font-size: ${fontSize}vmin;
							text-align: center;
							line-height: ${flexPercentage}vmin;
							text-transform: uppercase;
							max-width: ${avatarScale}vmin;
							max-height: ${avatarScale}vmin;

							&__img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}

							@media (orientation: portrait) {
								width: ${flexPercentage}vmax;
							}

							@media (orientation: landscape) {
								height: ${flexPercentage}vmax;
							}
						}
					`,
					(queued || nextUp) &&
						css`
							background-color: ${styleVars.colors.queued};
						`,
					hasFloor &&
						css`
							background-color: ${styleVars.colors.hasFloor};
						`,
				]}
			>
				{queueAhead
					? queueAhead.map(attendee => {
							const avatarSrc = room.attendees[attendee].avatar
							const initials =
								room.attendees[attendee].name &&
								getInitials(room.attendees[attendee].name as string)
							return (
								<div className="avatar" key={attendee}>
									{typeof avatarSrc === 'string' ? (
										<img className="avatar__img" src={avatarSrc} />
									) : initials ? (
										initials
									) : (
										undefined
									)}
								</div>
							)
					  })
					: undefined}
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
