import * as GQL from './gql/types'
import { Auth0UserProfile } from 'auth0-js'

export type Attendee = Pick<GQL.User, 'name' | 'avatar'>

export type Room = {
	name: GQL.Room['name']
	attendees: { [key in GQL.Attendee['user_id']]: Attendee }
	queue: GQL.Attendee['user_id'][]
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

export type TokenStore = {
	token: string
	getToken: () => TokenStore['token']
}

export type PusherAuthRequestData = {
	socket_id: string
	channel_name: string
}

export type PresenceUserData = {
	user_id: string
}

export type PresenceEvent = {
	channel: string
	name: string
} & PresenceUserData

export type PresenceNotification = {
	time_ms: number
	events: PresenceEvent[]
}
