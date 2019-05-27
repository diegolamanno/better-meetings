import { json } from 'micro'
import cors = require('micro-cors')
import Pusher = require('pusher')
import jwt = require('jsonwebtoken')
import {
	JWTPayload,
	PusherAuthRequestData,
	PresenceUserData,
} from '../../src/types'
const config: import('../../config/default-api').Config = require('../config.json')

const app: import('http').RequestListener = async (req, res) => {
	if (req.method === 'OPTIONS') {
		return res.end('ok!')
	}
	console.log('Pusher auth starts')
	try {
		const decoded = jwt.verify(
			(req.headers.authorization as string).replace(/^Bearer /, ''),
			config.auth.pem,
		) as JWTPayload
		console.log('Token verification successful')

		const userData: PresenceUserData = {
			user_id: (decoded as JWTPayload).sub,
		}
		const body = (await json(req)) as PusherAuthRequestData

		const auth = new Pusher(config.pusher).authenticate(
			body.socket_id,
			body.channel_name,
			userData,
		)
		console.log('sending response')
		return res.end(JSON.stringify(auth))
	} catch (e) {
		console.error('auth failed', e)
		res.statusCode = 403
		return res.end(e)
	}
}

export default cors()(app)
