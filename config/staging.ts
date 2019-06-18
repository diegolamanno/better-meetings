const config = {
	appBaseUrl: 'https://better-meetings.better-meetings.now.sh',
	pusher: {
		appId: '776718',
		key: 'b68b34bc276c952972c3',
		cluster: 'us2',
	},
}

export default config

export type Config = import('./default').Config & typeof config
