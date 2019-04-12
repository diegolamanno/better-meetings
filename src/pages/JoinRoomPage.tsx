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
import {
	getRoomQuery,
	addAndJoinRoomQuery,
	addAttendeeToRoom,
} from '../queries'
import { Context as AttendeeContext } from '../state/AttendeeMachine'
import { Context as RoomContext } from '../state/RoomMachine'

const JoinRoomPage: FC<RouteComponentProps> = () => {
	const attendeeMachine = useContext(AttendeeContext)
	const roomMachine = useContext(RoomContext)
	const [state, setState] = useState('')

	const searchRoom = async (client: ApolloClient<any>) => {
		try {
			const { data: searchResult } = await client.query({
				query: getRoomQuery,
				variables: { roomName: state },
			})
			if (searchResult.room.length) {
				try {
					await client.mutate({
						mutation: addAttendeeToRoom,
						variables: {
							user: attendeeMachine.context.name,
							roomId: searchResult.room[0].id,
						},
					})

					roomMachine.send({
						type: 'SUBSCRIBE',
						name: state,
					})
				} catch (e) {
					console.error('join error', e)
				}
			} else {
				try {
					const { data: addAndJoinResult } = await client.mutate({
						mutation: addAndJoinRoomQuery,
						variables: {
							roomName: state,
							administrator: attendeeMachine.context.name,
						},
					})

					roomMachine.send({
						type: 'SUBSCRIBE',
						name: addAndJoinResult.name,
					})
				} catch (e) {
					console.error('add and join error', e)
				}
			}
		} catch (e) {
			console.error('search error', e)
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
