const config = {
	hasura: {
		adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET as string,
	},
}

export default config

export type Config = import('./default').Config & typeof config
