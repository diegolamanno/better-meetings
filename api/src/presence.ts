import { json } from 'micro'
import { GraphQLClient } from 'graphql-request'
import { PresenceNotification, MutationResult } from '../../src/types'
const config: import('../../config/default-api').Config = require('../config.json')

export const removeAttendeeFromQueue = `
	mutation($userID: String, $roomID: bigint!) {
		delete_queue_record(
			where: { room_id: { _eq: $roomID }, user_id: { _eq: $userID } }
		) {
			affected_rows
		}
	}
`

export const removeAttendeeFromRoom = `
	mutation($userID: String, $roomID: bigint!) {
		delete_attendee(
			where: { user_id: { _eq: $userID }, room: { id: { _eq: $roomID } } }
		) {
			affected_rows
		}
	}
`

const app: import('http').RequestListener = async (req, res) => {
	console.log('presence event handler start')
	try {
		const received = (await json(req)) as PresenceNotification
		const events = received.events.filter(
			event => event.name === 'member_removed',
		)

		if (events.length) {
			const client = new GraphQLClient(config.hasura.graphqlUri, {
				headers: {
					'X-Hasura-Admin-Secret': config.hasura.adminSecret,
				},
			})

			await Promise.all(
				events.map(async event => {
					const roomID = event.channel.replace(/^presence-/, '')
					const userID = event.user_id
					console.log('removing queue record')
					await client.request<MutationResult<'delete_queue_record'>>(
						removeAttendeeFromQueue,
						{
							userID,
							roomID,
						},
					)
					console.log('queue record removed')
					console.log('removing attendee')
					await client.request<MutationResult<'delete_attendee'>>(
						removeAttendeeFromRoom,
						{
							userID,
							roomID,
						},
					)
					console.log('attendee removed')
				}),
			)
		}
		console.log('presence event handler end')
		res.end('success')
	} catch (e) {
		console.error('error handling presence event', e)
		res.statusCode = 500
		res.end('fail')
	}
}

export default app
