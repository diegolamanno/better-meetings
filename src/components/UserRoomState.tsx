/** @jsx jsx */

import { FC, Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import classNames from 'classnames'
import { State } from '../state/AttendeeMachine'

type UserRoomStateProps = import('@reach/router').RouteComponentProps & {
	state: State
}

type StateDescriptionsObj = Partial<{ [key in State]: string }>

const UserRoomState: FC<UserRoomStateProps> = props => {
	const { state } = props
	const stateDescriptions: StateDescriptionsObj = {
		hasFloor: 'You\'re on stage. Tapping transitions to idle.',
		nextUp: 'You\'re up next. Tapping transitions to idle.',
		queued: 'You\'re in line. Tapping transitions to idle.',
		idle: 'You\'re idle. Tapping transitions to queued.',
	}
	const mockUserQueue = ['u1', 'u2', 'u3', 'u4']
	const stateClassNames = classNames('user-room-state', {
		[state]: state,
	})
	// TODO: state description hides itself after a moment
	return (
		<div
			className={stateClassNames}
			css={css`
				height: 100%;
				position: relative;

				&.hasFloor {
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

				&.nextUp {
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

				.state-description {
					color: #fff;
					position: absolute;
					bottom: 10px;
					left: 10px;
					width: 70%;
					padding: 3px;
					border-radius: 3px;
					background-color: rgba(0, 0, 0, 0.6);
					font-family: sans-serif;
					font-size: 0.7em;
					text-align: center;
				}
			`}
		>
			{stateDescriptions[state] && (
				<div className="state-description">{stateDescriptions[state]}</div>
			)}
			{state === 'nextUp' && (
				<Fragment>
					<div className="user-queue-container">
						<div className="qi-circle" />
					</div>
				</Fragment>
			)}
			{state === 'queued' && (
				<Fragment>
					<div className="user-queue-container">
						{mockUserQueue.map(user => {
							return (
								<div className="qi-circle" data-user-qid={user} key={user} />
							)
						})}
					</div>
				</Fragment>
			)}
		</div>
	)
}

export default UserRoomState
