const config = {
	pusher: {
		secret: process.env.PUSHER_SECRET_DEV,
	},
	hasura: {
		adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
		queryCollectionName: 'allowedQueries',
	},
}

export default config

export type Config = import('./default').Config & typeof config
