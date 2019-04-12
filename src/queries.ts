import gql from 'graphql-tag'

export const addAndJoinRoomQuery = gql`
	mutation CreateRoom($roomName: String, $administrator: String) {
		insert_room(
			objects: [
				{
					administrator: $administrator
					name: $roomName
					attendees: { data: [{ user_id: $administrator, remote: true }] }
				}
			]
		) {
			affected_rows
			returning {
				name
			}
		}
	}
`
export const getRoomQuery = gql`
	query($roomName: String) {
		room(where: { name: { _eq: $roomName } }) {
			id
			name
			administrator
		}
	}
`

export const addUser = gql`
	mutation($user: String, $jwt: String!, $email: String!, $avatar: String!) {
		insert_user(
			objects: [{ auth_id: $user, name: $jwt, email: $email, avatar: $avatar }]
		) {
			affected_rows
		}
	}
`

export const addAttendeeToRoom = gql`
	mutation($user: String!, $roomId: bigint!) {
		insert_attendee(
			objects: [{ user_id: $user, room_id: $roomId, remote: true }]
		) {
			returning {
				room {
					name
				}
			}
		}
	}
`
export const subscribeToRoom = gql`
	subscription($roomName: String!) {
		room(where: { name: { _eq: $roomName } }) {
			attendees {
				user_id
			}
			queue {
				user_id
			}
		}
	}
`
