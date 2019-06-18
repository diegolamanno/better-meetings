const config = {
	appBaseUrl: 'https://better-meetings.live',
	pusher: {
		appId: '776719',
		key: 'b2a0dcbbb5d525aa2232',
		cluster: 'us2',
	},
}

export default config

export type Config = import('./default').Config & typeof config
