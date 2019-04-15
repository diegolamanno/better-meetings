import gql from 'graphql-tag'

export const addAttendeeToRoom = gql`
	mutation($userId: String!, $roomId: bigint!) {
		insert_attendee(
			objects: [{ user_id: $userId, room_id: $roomId, remote: true }]
		) {
			returning {
				room {
					name
				}
			}
		}
	}
`

export const addAttendeeToNewRoom = gql`
	mutation($roomName: String, $userId: String) {
		insert_room(
			objects: [
				{
					administrator: $userId
					name: $roomName
					attendees: { data: [{ user_id: $userId, remote: true }] }
				}
			]
		) {
			returning {
				id
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

export type AttendeeData = {
	user_id: string
}

export type RooomData = {
	attendees: AttendeeData[]
}

export const addAttendeeToQueue = ``

export const removeAttendeeFromQueue = ''

export const removeAttendeeFromRoom = ''
