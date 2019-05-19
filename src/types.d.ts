import * as GQL from './gql/types'
import { Auth0UserProfile } from 'auth0-js'

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

export type JWT = {
	iss: string
	sub: string
	aud: string
	exp: number
} & Auth0UserProfile

export { GQL }
