import { JWTPayload, GQL } from './types'

export const getInitials = (name: string) => {
	const initials = name.match(/\b\w/g) || []
	return (initials.shift() || '') + (initials.pop() || '')
}

export const getName = (userData: JWTPayload) =>
	userData.nickname || userData.given_name || userData.name

export const getQueuePosition = (
	userID: GQL.Queue_Record['user_id'],
	queue: GQL.Room['queue'],
) => queue.findIndex(record => record.user_id === userID)
