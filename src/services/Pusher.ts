import Pusher, { Authorizer } from 'pusher-js'
import { getIdToken } from '@services'
import { PusherAuthRequestData } from '../types'

const authorizer: Authorizer = channel => ({
	authorize: async (socketID, callback) => {
		const requestData: PusherAuthRequestData = {
			socket_id: socketID,
			channel_name: channel.name,
		}
		const response = await fetch(CONFIG.pusher.authEndpoint, {
			body: JSON.stringify(requestData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${getIdToken()}`,
			},
		})

		if (response) {
			const auth = await response.json()
			callback(false, auth)
		} else {
			callback(true)
		}
	},
})

const pusher = new Pusher(CONFIG.pusher.key, {
	authorizer,
	cluster: CONFIG.pusher.cluster,
	forceTLS: true,
	disableStats: true,
})

export { pusher as Pusher }

export default pusher
