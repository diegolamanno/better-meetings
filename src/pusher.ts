import Pusher from 'pusher-js'

const pusher = new Pusher(CONFIG.pusher.key, {
	cluster: CONFIG.pusher.cluster,
	forceTLS: true,
	disableStats: true,
	authEndpoint: CONFIG.pusher.authEndpoint,
})

export default pusher
