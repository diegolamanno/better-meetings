import gql from 'graphql-tag'

export const addRoomQuery = gql`
	mutation CreateRoom($roomName: String!, $administrator: String!) {
		insert_room(
			objects: [{ administrator: $administrator, room_name: $roomName }]
		) {
			affected_rows
		}
	}
`
export const getRoomQuery = gql`
	query($roomName: String) {
		room(where: { room_name: { _eq: $roomName } }) {
			room_name
			administrator
		}
	}
`
