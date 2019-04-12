import React, { Component } from 'react'
import {
	FormGroup,
	FormControl,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap'
import { navigate, RouteComponentProps } from '@reach/router'
import { Mutation } from 'react-apollo'
import { addRoomQuery } from '../queries'

type State = {
	roomName: string
	administrator: string | null
}

class CreateRoomPage extends Component<RouteComponentProps, State> {
	constructor(props: RouteComponentProps) {
		super(props)

		this.state = {
			roomName: '',
			administrator: null,
		}
	}

	addRoom(insertRoom: any) {
		const adminID = localStorage.getItem('sub')
		this.setState({ administrator: adminID }, () => {
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
				{(insertRoom: any, data: any) => {
					console.log(data)
					return (
						<Form
							onSubmit={(e: any) => {
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
										onChange={(e: any) =>
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
