import React, { Component } from 'react'
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
import { identifier } from '@babel/types'

// type ResultData = any

class JoinRoomPage extends Component<RouteComponentProps> {
	state = {
		searchText: '',
		roomName: '',
		roomId: '',
		roomAdministrator: '',
		roomError: false,
	}

	async searchRoom(client: ApolloClient<any>) {
		try {
			this.setState({
				roomName: '',
				roomId: '',
				roomAdministrator: '',
				roomError: false,
			})
			const { data } = await client.query({
				query: getRoomQuery,
				variables: { roomName: this.state.searchText },
			})
			const room = data.room[0]
			this.setState({
				roomName: room.name,
				roomId: room.id,
				roomAdministrator: room.administrator,
			})
		} catch (error) {
			// what happened buddy?
			this.setState({ roomError: true })
		}
	}

	render() {
		const haveRoom = () => {
			return this.state.roomId !== ''
		}
		return (
			<ApolloConsumer>
				{client => {
					return (
						<>
							{!haveRoom() && this.state.roomError === true && (
								<div>That room doesn't seem to exist.</div>
							)}
							{haveRoom() && (
								<>
									<dl>
										<dt>Room Name</dt>
										<dd>{this.state.roomName}</dd>
										<dt>Room ID</dt>
										<dd>{this.state.roomId}</dd>
										<dt>Room Administrator</dt>
										<dd>{this.state.roomAdministrator}</dd>
									</dl>
									but now actually navigate to the room
								</>
							)}
							<Form
								onSubmit={(e: any) => {
									e.preventDefault()
									this.searchRoom(client)
								}}
							>
								<FormGroup controlId="CreateRoom">
									<InputGroup>
										<FormControl
											type="text"
											value={this.state.searchText}
											placeholder="Join a room"
											onChange={(e: any) =>
												this.setState({ searchText: e.target.value })
											}
										/>
										<InputGroup>
											<Button type="submit">+</Button>
										</InputGroup>
									</InputGroup>
								</FormGroup>
							</Form>
						</>
					)
				}}
			</ApolloConsumer>
		)
	}
}

export default JoinRoomPage
