import React, { FC, useContext, useState, useEffect } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { RouteComponentProps, navigate } from '@reach/router'
import { AttendeeContext } from '../providers/AttendeeProvider'

const Join: FC<RouteComponentProps> = () => {
	const attendeeMachine = useContext(AttendeeContext)
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		if (attendeeMachine.state.matches('authenticated.present')) {
			navigate(`/room`)
		} else if (attendeeMachine.state.matches('unauthenticated')) {
			navigate('/')
		}
	}, [attendeeMachine.state.value])

	const joinRoom = () => {
		attendeeMachine.send({
			type: 'JOIN',
			roomName: searchValue,
		})
	}

	if (!attendeeMachine.state.matches('authenticated')) {
		return <div>loading...</div>
	}

	return (
		<Form
			onSubmit={(e: any) => {
				e.preventDefault()
				joinRoom()
			}}
		>
			<FormGroup controlId="CreateRoom">
				<InputGroup>
					<FormControl
						value={searchValue}
						onChange={(e: any) => setSearchValue(e.target.value)}
						type="text"
						placeholder="Join a room"
					/>
					<InputGroup>
						<Button type="submit">+</Button>
					</InputGroup>
				</InputGroup>
			</FormGroup>
		</Form>
	)
}

export default Join
