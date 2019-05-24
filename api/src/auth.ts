import { form } from 'co-body'
import Pusher = require('pusher')
import jwt = require('jsonwebtoken')
import fetch from 'node-fetch'
const config: import('../../config/default-api').Config = require('../config.json')

const pusher = new Pusher(config.pusher)

type AjaxAuthRequest = {
	socket_id: string
	channel_name: string
}

const app: import('http').RequestListener = async (req, res) => {
	const pem = await (await fetch(`https://${config.auth.domain}/pem`)).text()

	if (
		req.headers.Authorization &&
		typeof req.headers.Authorization === 'string'
	) {
		console.log(jwt.verify(req.headers.Authorization, pem))
	}

	const body = (await form(req)) as AjaxAuthRequest

	const auth = pusher.authenticate(body.socket_id, body.channel_name)

	res.end(JSON.stringify(auth))
}

export default app
