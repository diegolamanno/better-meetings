import { StateSchema } from 'xstate'

export interface Attendee {
	id: string
	name: string
}

// this is temporary, will change when we know what a subscription actually looks like
export type Subscription = {
	unsubscribe: () => void
}

export interface Room {
	id: string
	name: string
	attendees: Attendee[]
	queue: Attendee[]
	speaker?: Attendee
}
