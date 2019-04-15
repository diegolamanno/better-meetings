import { Subscription_Root } from './types'
import { Room } from '../types'
export const roomSubscription: (data: {
	room: Subscription_Root['room']
}) => Room[] = data =>
	data.room.map(({ id, name, attendees, queue }) => ({
		id,
		name,
		attendees: attendees.map(attendee => attendee.user_id),
		queue: queue.map(record => record.user_id),
	}))
