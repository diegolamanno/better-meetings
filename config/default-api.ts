const config = {
	pusher: {
		secret: process.env.PUSHER_SECRET_DEV as string,
	},
	hasura: {
		adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET as string,
	},
}

export default config

export type Config = import('./default').Config & typeof config
