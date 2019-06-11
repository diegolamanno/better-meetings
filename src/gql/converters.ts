import { Subscription_Root } from './types'
import { Room } from '../types'
export const roomSubscription: (data: {
	room: Subscription_Root['room']
}) => Room[] = data =>
	data.room.map(({ name, attendees, queue }) => ({
		name,
		attendees: attendees.reduce(
			(obj, attendee) => {
				obj[attendee.user_id] = {
					name: attendee.user.name,
					avatar: attendee.user.avatar,
				}

				return obj
			},
			{} as Room['attendees'],
		),
		queue: queue.map(record => record.user_id),
	}))
