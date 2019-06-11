import gql from 'graphql-tag'

export const getUser = gql`
	query($authID: String!) {
		user(where: { auth_id: { _eq: $authID } }) {
			auth_id
		}
	}
`

export const addAttendeeToRoom = gql`
	mutation($userID: String!, $roomID: bigint!) {
		insert_attendee(
			objects: [{ user_id: $userID, room_id: $roomID, remote: true }]
		) {
			returning {
				room {
					name
				}
			}
		}
	}
`

export const createRoom = gql`
	mutation($name: String) {
		insert_room(objects: [{ name: $name }]) {
			returning {
				id
			}
		}
	}
`
export const getRoomQuery = gql`
	query($name: String) {
		room(where: { name: { _eq: $name } }) {
			id
			name
		}
	}
`

export const addUser = gql`
	mutation($authID: String!, $name: String, $avatar: String) {
		insert_user(objects: [{ auth_id: $authID, name: $name, avatar: $avatar }]) {
			affected_rows
		}
	}
`

export const subscribeToRoom = gql`
	subscription($name: String!) {
		room(where: { name: { _eq: $name } }) {
			id
			name
			attendees {
				user_id
				user {
					name
					avatar
				}
			}
			queue {
				user_id
			}
		}
	}
`

export const addAttendeeToQueue = gql`
	mutation($userID: String, $roomID: bigint!) {
		insert_queue_record(objects: { room_id: $roomID, user_id: $userID }) {
			returning {
				room {
					queue {
						user_id
					}
				}
			}
		}
	}
`

export const removeAttendeeFromQueue = gql`
	mutation($userID: String, $roomID: bigint!) {
		delete_queue_record(
			where: { room_id: { _eq: $roomID }, user_id: { _eq: $userID } }
		) {
			affected_rows
		}
	}
`

export const removeAttendeeFromRoom = gql`
	mutation($userID: String, $roomID: bigint!) {
		delete_attendee(
			where: { user_id: { _eq: $userID }, room: { id: { _eq: $roomID } } }
		) {
			affected_rows
		}
	}
`
