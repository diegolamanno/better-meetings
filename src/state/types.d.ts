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
	name: string
	attendees: Attendee[]
	queue: Attendee[]
}
