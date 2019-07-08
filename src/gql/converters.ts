import { Subscription_Root } from './types'
import { Room } from '../types'
export const roomSubscription: (data: {
	room: Subscription_Root['room']
}) => Room[] = data =>
	data.room.map(({ name, attendees, queue }) => ({
		name,
		attendees: attendees.reduce<Room['attendees']>((obj, attendee) => {
			obj[attendee.user_id] = {
				name: attendee.user.name,
				avatar: attendee.user.avatar,
			}

			return obj
		}, {}),
		queue: queue.map(record => record.user_id),
	}))
