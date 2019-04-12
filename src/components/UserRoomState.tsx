/** @jsx jsx */

import { FC, Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import classNames from 'classnames'
import { RouteComponentProps } from '@reach/router'
import { State } from '../state/participantMachine'

type UserRoomStateProps = RouteComponentProps<{
	state: State
}>

const UserRoomState: FC<UserRoomStateProps> = props => {
	const { state } = props
	const mockUserQueue = ['u1', 'u2', 'u3', 'u4']
	const stateClassNames = classNames('user-room-state', {
		[state as string]: state,
	})
	return (
		<div
			className={stateClassNames}
			css={css`
				height: 100%;

				&.up {
					background-color: #fff;
					color: #000;
				}

				&.queued,
				&.idle {
					background-color: #000;
					color: #fff;
				}

				&.queued {
					.qi-circle {
						width: 10%;
						padding-bottom: 10%;
						background-color: #fff;
					}
				}

				&.next {
					background-color: #ff8f02;
					color: #000;

					.qi-circle {
						width: 30%;
						padding-bottom: 30%;
						background-color: #000;
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
			{state === 'up' && (
				<Fragment>You're on stage. Tapping here transitions to idle.</Fragment>
			)}
			{state === 'next' && (
				<Fragment>
					You're up next. Tapping here transitions to idle.
					<div className="user-queue-container">
						<div className="qi-circle" />
					</div>
				</Fragment>
			)}
			{state === 'queued' && (
				<Fragment>
					You're in line. Tapping here transitions to idle.
					<div className="user-queue-container">
						{mockUserQueue.map(user => {
							return (
								<div className="qi-circle" data-user-qid={user} key={user} />
							)
						})}
					</div>
				</Fragment>
			)}
			{state === 'idle' && (
				<Fragment>You're idle. Tapping here transitions to queued.</Fragment>
			)}
		</div>
	)
}

export default UserRoomState
