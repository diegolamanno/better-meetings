import React, { Component } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { navigate } from '@reach/router'
import { Mutation } from 'react-apollo'
import { addRoomQuery } from '../queries'

type State = {
	roomName: string
	administrator: number | null
}

type Props = {}

class CreateRoomPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			roomName: '',
			administrator: null,
		}
	}

	addRoom(insertRoom) {
		// const administrator = localStorage.getItem('sub')
		this.setState({ administrator: 2 }, function() {
			insertRoom({
				variables: this.state,
			})
		})
	}

	moveToCreatedRoom() {
		this.state.roomName
			? navigate(`./${this.state.roomName}`)
			: console.log('Something went wrong. Room was not created')
	}

	render() {
		return (
			<Mutation mutation={addRoomQuery}>
				{(insertRoom, data) => {
					console.log(data)
					return (
						<Form
							onSubmit={e => {
								e.preventDefault()
								this.addRoom(insertRoom)
								this.moveToCreatedRoom()
							}}
						>
							<FormGroup controlId="CreateRoom">
								<InputGroup>
									<FormControl
										type="text"
										value={this.state.roomName}
										placeholder="Create a room"
										onChange={(e: { target: { value: any } }) =>
											this.setState({ roomName: e.target.value })
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
			</Mutation>
		)
	}
}

export default CreateRoomPage
