/** @jsx jsx */

import { FC } from 'react'
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'

type UserRoomStateProps = RouteComponentProps<{
	state: 'stage' | 'next' | 'queued' | 'idle'
}>

const UserRoomState: FC<UserRoomStateProps> = props => {
	const { state } = props
	const mockUserQueue = ['u1', 'u2', 'u3', 'u4']
	return (
		<div
			css={css`
				.user-room-state {
					height: 100%;
				}
				.user-room-state.stage {
					background-color: white;
					color: black;
				}
				.user-room-state.queued,
				.user-room-state.idle {
					background-color: black;
					color: white;
				}
				.user-room-state.queued {
					.qi-circle {
						width: 10%;
						padding-bottom: 10%;
						background-color: white;
					}
				}
				.user-room-state.next {
					background-color: #ff8f02;
					color: black;

					.qi-circle {
						width: 30%;
						padding-bottom: 30%;
						background-color: black;
					}
				}
				.user-queue-container {
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 100%;
					.qi-circle {
						border-radius: 50%;
						margin: 0 auto 1.5em auto;
						&:last-child {
							margin-bottom: 0;
						}
					}
				}
			`}
		>
			{state === 'stage' && (
				<div className="user-room-state stage">
					You're on stage! Tapping here transitions to idle.
				</div>
			)}
			{state === 'next' && (
				<div className="user-room-state next">
					You're up next! Tapping here transitions to idle.
					<div className="user-queue-container">
						<div className="qi-circle" />
					</div>
				</div>
			)}
			{state === 'queued' && (
				<div className="user-room-state queued">
					You're in line! Tapping here transitions to idle.
					<div className="user-queue-container">
						{mockUserQueue.map(user => {
							return (
								<div className="qi-circle" data-user-qid={user} key={user} />
							)
						})}
					</div>
				</div>
			)}
			{state === 'idle' && (
				<div className="user-room-state idle">
					You're idle! Tapping here transitions to queued.
				</div>
			)}
		</div>
	)
}

export default UserRoomState
