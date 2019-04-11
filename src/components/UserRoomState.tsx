/** @jsx jsx */

import { FC, Fragment } from 'react'
import { jsx } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'

type UserRoomStateProps = RouteComponentProps<{
	state: 'stage' | 'next' | 'queue' | 'idle'
}>

const UserRoomState: FC<UserRoomStateProps> = props => {
	const { state } = props
	return (
		<Fragment>
			{state === 'stage' && <div>You're on stage!</div>}
			{state === 'next' && <div>You're up next!</div>}
			{state === 'queue' && <div>You're in line!</div>}
			{state === 'idle' && <div>You're idle!</div>}
		</Fragment>
	)
}

export default UserRoomState
