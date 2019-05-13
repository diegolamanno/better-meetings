const config = {
	devServerPort: 8080,
	get appBaseUrl() {
		return `http://localhost:${this.devServerPort}`
	},
	get auth(this: typeof config) {
		return {
			domain: 'hth5-better-meetings.auth0.com',
			clientID: 'Kq0yYNlH56xphZRBVs9wbZ2W4LRrDrTd',
			redirectUri: `${this.appBaseUrl}/callback`,
			get audience(this: typeof config.auth) {
				return `https://${this.domain}/userinfo`
			},
			responseType: 'token id_token',
			scope: 'openid',
		}
	},
	pusher: {
		appId: '1210',
		key: '006074710cec8f7745ba',
		cluster: 'us2',
		authEndpoint: '/api/auth',
	},
}

export default config

export type Config = typeof config
