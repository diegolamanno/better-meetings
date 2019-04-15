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
import { getRoomQuery } from '../gql/queries'
import { Context as AttendeeContext } from '../providers/AttendeeProvider'

const JoinRoomPage: FC<RouteComponentProps> = () => {
	const { send: attendeeSend } = useContext(AttendeeContext)
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

export default JoinRoomPage
