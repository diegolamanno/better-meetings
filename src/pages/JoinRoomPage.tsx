import React, { Component } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { ApolloConsumer, QueryResult } from 'react-apollo'
import { getRoomQuery } from '../queries'

type ResultData = any

class JoinRoomPage extends Component {
	state = {
		searchText: '',
		roomName: '',
	}

	async searchRoom(client) {
		const { data } = await client.query({
			query: getRoomQuery,
			variables: { roomName: this.state.searchText },
		})
		console.log(data)
		this.setState({
			roomName: data.room_name,
		})
	}

	render() {
		return (
			<ApolloConsumer>
				{client => {
					return (
						<Form
							onSubmit={e => {
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
										onChange={(e: { target: { value: any } }) =>
											this.setState({ searchText: e.target.value })
										}
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
}

export default JoinRoomPage
