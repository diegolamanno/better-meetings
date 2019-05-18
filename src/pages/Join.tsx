import React, { FC, useContext, useState } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { RouteComponentProps, navigate } from '@reach/router'
import ApolloConsumer from 'react-apollo/ApolloConsumer'
import ApolloClient from 'apollo-client/ApolloClient'
import { getRoomQuery } from '../gql/queries'
import { Context as AttendeeContext } from '../providers/AttendeeProvider'

const Join: FC<RouteComponentProps> = () => {
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)
	const [roomName, setRoomName] = useState('')

	const searchRoom = async (client: ApolloClient<any>) => {
		try {
			const { data: searchResult } = await client.query({
				query: getRoomQuery,
				variables: { roomName },
			})
			if (searchResult.room.length) {
				attendeeSend({
					roomName,
					type: 'JOIN',
					roomId: searchResult.room[0].id,
				})
			} else {
				attendeeSend({
					roomName,
					type: 'CREATE',
				})
			}
		} catch (e) {
			console.error('search error', e)
		}
	}

	if (attendeeState.matches('authenticated.present')) {
		navigate(`:${attendeeState.context.roomId}`)
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
									value={roomName}
									onChange={(e: any) => setRoomName(e.target.value)}
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

export default Join
