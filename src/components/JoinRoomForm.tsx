import React, {
	FC,
	useContext,
	useEffect,
	useRef,
	FormEventHandler,
} from 'react'

import { RouteComponentProps, navigate } from '@reach/router'
import { AttendeeContext } from '@providers'
import { Input, Button } from '@components'

export const JoinRoomForm: FC<RouteComponentProps> = () => {
	const attendeeMachine = useContext(AttendeeContext)

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (attendeeMachine.state.matches('authenticated.present')) {
			navigate(`/room`)
		}
	}, [attendeeMachine.state.value])

	const handleSubmit: FormEventHandler = event => {
		event.preventDefault()
		if (inputRef.current) {
			attendeeMachine.send({
				type: 'JOIN',
				roomName: inputRef.current.value,
			})
		}
	}

	if (!attendeeMachine.state.matches('authenticated')) {
		return <div>loading...</div>
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				ref={inputRef}
				type="text"
				label="Enter the name of a room to join"
				required
			/>
			<Button type="submit">Join</Button>
		</form>
	)
}

export default JoinRoomForm
