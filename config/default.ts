const config = {
	devServerPort: 8080,
	get appBaseUrl() {
		return `http://localhost:${this.devServerPort}`
	},
	get auth(this: typeof config) {
		const appBaseUrl = this.appBaseUrl
		return {
			domain: 'better-meetings.auth0.com',
			clientID: 'ECPjSCN0PafxqSEY20Jo9dfzDzPEfwCl',
			callbackPath: 'callback',
			get redirectUri(this: typeof config.auth) {
				return `${appBaseUrl}/${this.callbackPath}`
			},
			get audience(this: typeof config.auth) {
				return `https://${this.domain}/userinfo`
			},
			responseType: 'token id_token',
			scope: 'openid',
			prompt: 'none',
			returnTo: `${appBaseUrl}`,
		}
	},
	api: {
		baseURL: '/api',
	},
	get pusher(this: typeof config) {
		return {
			appId: '776717',
			key: '006074710cec8f7745ba',
			cluster: 'us2',
			authEndpoint: `${this.api.baseURL}/auth`,
		}
	},
	hasura: {
		graphqlUri: 'https://hth5-better-meetings.herokuapp.com/v1alpha1/graphql',
	},
}

export default config

export type Config = typeof config
