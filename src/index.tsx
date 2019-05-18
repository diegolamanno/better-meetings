import React from 'react'
import { render } from 'react-dom'
import Pusher from 'pusher-js'
import App from './components/App'
import 'normalize.css/normalize.css'

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)

const pusher = new Pusher(CONFIG.pusher.key, {
	cluster: CONFIG.pusher.cluster,
	forceTLS: true,
	disableStats: true,
	authEndpoint: CONFIG.pusher.authEndpoint,
})

pusher.subscribe('presence-room')
