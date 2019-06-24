type Defer = <T>(func: () => T) => T
const nodeModulesParentDir =
	process.env.NODE_APP_INSTANCE === 'api' ? '../api' : '../'
const defer: Defer = require(`${nodeModulesParentDir}/node_modules/config/defer.js`)
	.deferConfig

const config = {
	devServerPort: 8080,
	get appBaseUrl() {
		return `http://localhost:${this.devServerPort}`
	},
	get auth() {
		const callbackPath = 'callback'
		return {
			callbackPath,
			domain: 'better-meetings.auth0.com',
			clientID: 'ECPjSCN0PafxqSEY20Jo9dfzDzPEfwCl',
			redirectUri: defer(function(this: typeof config) {
				return `${this.appBaseUrl}/${callbackPath}`
			}),
			get audience() {
				return `https://${this.domain}/userinfo`
			},
			responseType: 'token id_token',
			scope: 'openid profile',
			prompt: 'none',
			returnTo: defer(function(this: typeof config) {
				return `${this.appBaseUrl}`
			}),
			pem:
				'-----BEGIN CERTIFICATE-----\nMIIDDTCCAfWgAwIBAgIJTTMqBCTqeyGsMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV\nBAMTGWJldHRlci1tZWV0aW5ncy5hdXRoMC5jb20wHhcNMTkwNTE0MjIxNzA5WhcN\nMzMwMTIwMjIxNzA5WjAkMSIwIAYDVQQDExliZXR0ZXItbWVldGluZ3MuYXV0aDAu\nY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLzOEmLvfFgV6lfO\nn8xZBiIPLNiDpgtqU1JZIqoDBrVQnh0y1pV+aBGr9ej7Wx4SeTEQdacaOgmSZgwI\nkkBFJtniJ7R587pt7Qjo+Y22J9zXEiIkTwlKzmb6T1nI/pQs7/enMUSE1RCkF/bd\nMBGqUY6q4XABvQ8ps/3Ip4Zq7yRp9HSIWSlpyIsq5gmmJ9St5H3SooTELYa70lEZ\nQYhrL2kWB53v+CselaUdsSG8FH5w2HZNqRTf/+tz6St5ntxkpFKtM1qamGzQ48Wz\nA8DdADGAFfEvxBKfybaWIlqSL1zcMnbm+3FBROAnSa/hr6jvZk8IDw2GglsVBJkx\nDv1AnQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBR95xmctreh\nY0QugBftrXo/yYmnDzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB\nAK6pMytK+O2OfQgTf80tGqh9gCZAS/tSXAPjx3K9/LOAaHyE0k1BB+FVcV9WIWdt\ntbJJb6P/yhL44TT0BoLXihLjwAirc+9/alRPeI7gU/QhfLe20II4ueDSLX/xpcq+\nfF07cIxM3BsggOFD2GkC+NK5ANhJR5jh/nRxjA/BEuunwX7qrJfcB7DA3wWHRLSc\nmn+XMiJJjh/c6zN08L3VfSNzQ70mnkH4dkfzc8JWtfoN6gkk86qr3DOoXoDQejx/\nccWuLckxpWQ1pGZUeg9+w+ZN7Gg2VJFqNFWfSeBtCad7Y1oZV1m1qQxqlnutBmdq\nRJGh6xqy9jY8BRwKBhvGptU=\n-----END CERTIFICATE-----\n',
		}
	},
	api: {
		baseURL: '/api',
	},
	get pusher() {
		return {
			appId: '776717',
			key: '006074710cec8f7745ba',
			cluster: 'us2',
			authEndpoint: `${this.api.baseURL}/auth`,
			presenceEndpoint: `${this.api.baseURL}/presence`,
		}
	},
	get hasura() {
		const baseUrl = 'https://hth5-better-meetings.herokuapp.com/v1'
		return {
			baseUrl,
			graphqlUri: `${baseUrl}/graphql`,
			apiEndpoint: `${baseUrl}/query`,
		}
	},
}

export default config

export type Config = typeof config
