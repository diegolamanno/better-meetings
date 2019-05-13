const config = {
	pusher: {
		secret: process.env.PUSHER_SECRET as string,
	},
}

export default config

export type Config = import('./default').Config & typeof config
