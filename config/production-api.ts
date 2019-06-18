const config = {
	pusher: {
		secret: process.env.PUSHER_SECRET_PROD,
	},
}

export default config

export type Config = import('./default-api').Config & typeof config
