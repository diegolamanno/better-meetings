import React, { FC, useContext, useState } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { RouteComponentProps } from '@reach/router'
import { ApolloConsumer } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { getRoomQuery } from '../queries'
import { Context as AttendeeContext } from '../state/AttendeeMachine'
// import { Context as RoomContext } from '../state/RoomMachine'

const JoinRoomPage: FC<RouteComponentProps> = () => {
	const attendeeMachine = useContext(AttendeeContext)
	// const roomMachine = useContext(RoomContext)
	const [state, setState] = useState('')

	const searchRoom = async (client: ApolloClient<any>) => {
		try {
			const { data } = await client.query({
				query: getRoomQuery,
				variables: { roomName: state },
			})
			if (data.room.length) {
				console.log(`Joining ${state}...`)
				// update roomMachine
				attendeeMachine.send('JOIN')
			} else {
				console.log('no rooms found!')
			}
		} catch {
			console.error('can\'t join room')
		}
	}

	return (
		<ApolloConsumer>
			{client => {
				return (
					<Form
						onSubmit={(e: any) => {
							e.preventDefault()
							searchRoom(client)
						}}
					>
						<FormGroup controlId="CreateRoom">
							<InputGroup>
								<FormControl
									value={state}
									onChange={(e: any) => setState(e.target.value)}
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
			}}
		</ApolloConsumer>
	)
}

export default JoinRoomPage
