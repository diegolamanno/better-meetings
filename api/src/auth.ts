import { form } from 'co-body'
import Pusher = require('pusher')
const config: import('../../config/default-api').Config = require('../config.json')

const pusher = new Pusher(config.pusher)

type AjaxAuthRequest = {
	socket_id: string
	channel_name: string
}

const app: import('http').RequestListener = async (req, res) => {
	const body = (await form(req)) as AjaxAuthRequest
	const timestamp = new Date().toISOString()
	const presenceData = {
		user_id: `user-${timestamp}`,
		user_info: {
			name: 'Pusherino',
			twitter_id: '@pusher',
		},
	}
	const auth = pusher.authenticate(
		body.socket_id,
		body.channel_name,
		presenceData,
	)

	res.end(JSON.stringify(auth))
}

export default app
