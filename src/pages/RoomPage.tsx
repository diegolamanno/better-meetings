/** @jsx jsx */

import { FC, Fragment } from 'react'
import { jsx, css, Global } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'

import UserRoomState from '../components/UserRoomState'

type RoomProps = RouteComponentProps<{ roomId: string }>

const RoomPage: FC<RoomProps> = props => {
	const { roomId } = props
	return (
		<Fragment>
			<Global
				styles={css`
					.state-container {
						background-color: blue;
					}
				`}
			/>
			<div
				css={css`
					height: 100%;
					background-color: red;
				`}
			>
				<p>welcome to the room: {roomId}!</p>
				<div className="state-container">
					<UserRoomState state="idle" />
				</div>
			</div>
		</Fragment>
	)
}

export default RoomPage
