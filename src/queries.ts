import gql from 'graphql-tag'

export const addRoomQuery = gql`
	mutation CreateRoom($roomName: String!, $administrator: String!) {
		insert_room(objects: [{ administrator: $administrator, name: $roomName }]) {
			affected_rows
		}
	}
`
export const getRoomQuery = gql`
	query($roomName: String) {
		room(where: { name: { _eq: $roomName } }) {
			room_name
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
