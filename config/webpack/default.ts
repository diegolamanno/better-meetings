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
	firebase: {
		apiKey: 'AIzaSyD83E_cMKqVBsbtPjWB34oyxuf0Rv6qjBE',
		projectId: 'better-meetings-a24e7',
		storageBucket: 'better-meetings-a24e7.appspot.com',
		messagingSenderId: '754316304166',
		appId: '1:754316304166:web:df8a94549a281e7e',
		devUrl: 'http://localhost:5000',
	},
}

export default config
