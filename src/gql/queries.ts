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

export const addAttendeeToQueue = gql`
	mutation($userId: String, $roomId: bigint!) {
		insert_queue_record(objects: { room_id: $roomId, user_id: $userId }) {
			affected_rows
		}
	}
`

export const removeAttendeeFromQueue = gql`
	mutation($userId: String, $roomId: bigint!) {
		delete_queue_record(
			where: { room_id: { _eq: $roomId }, user_id: { _eq: $userId } }
		) {
			affected_rows
		}
	}
`

export const removeAttendeeFromRoom = gql`
	mutation($userId: String, $roomId: bigint!) {
		delete_attendee(
			where: { room_id: { _eq: $roomId }, user_id: { _eq: $userId } }
		) {
			affected_rows
		}
	}
`
