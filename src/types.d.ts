import * as GQL from './gql/types'

export interface Attendee {
	userId: string
	token: string
}

export interface Room {
	name: string
	id: any
	attendees: Attendee['userId'][]
	queue: Attendee['userId'][]
}

export { GQL }
