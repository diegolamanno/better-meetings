import * as GQL from './gql/types'
import { Auth0UserProfile } from 'auth0-js'

export interface Attendee {
	userID: GQL.User['auth_id']
}

export interface Room {
	name: GQL.Room['name']
	id: GQL.Room['id']
	attendees: Attendee['userID'][]
	queue: Attendee['userID'][]
}

export type JWTPayload = {
	iss: string
	sub: string
	aud: string
	exp: number
} & Auth0UserProfile

export { GQL }

export type MutationResult<T extends keyof GQL.Mutation_Root> = Pick<
	GQL.Mutation_Root,
	T
>

export type SubscriptionData<T extends keyof GQL.Subscription_Root> = Pick<
	GQL.Subscription_Root,
	T
>

export type Query<T extends keyof GQL.Query_Root> = Pick<GQL.Query_Root, T>
