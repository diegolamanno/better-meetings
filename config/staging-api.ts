const config = {
	pusher: {
		secret: process.env.PUSHER_SECRET_STAGE,
	},
}

export default config

export type Config = import('./default-api').Config & typeof config
