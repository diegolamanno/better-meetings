import { WebAuth } from 'auth0-js'
import { navigate } from '@reach/router'
import jwt_decode from 'jwt-decode'

export const login = () => {
	auth0.authorize()
}

export const logout = () => {
	// Clear Access Token and ID Token from local storage
	localStorage.removeItem('id_token')
	localStorage.removeItem('expires_at')
	localStorage.removeItem('sub')
	// navigate to the home route
	navigate('/')
}

const auth0 = new WebAuth({
	domain: process.env.REACT_APP_DOMAIN!,
	clientID: process.env.REACT_APP_CLIENTID!,
	redirectUri: process.env.REACT_APP_REDIRECTURI,
	audience: `https://${process.env.REACT_APP_DOMAIN}/userinfo`,
	responseType: 'token id_token',
	scope: 'openid',
})

const setSession = (idToken: string, sub: string, expiresIn?: number) => {
	localStorage.setItem('id_token', idToken)
	localStorage.setItem('sub', sub)
	if (expiresIn) {
		// Set the time that the Access Token will expire at
		const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
		localStorage.setItem('expires_at', expiresAt)
	}
}

export const handleAuthentication = () => {
	auth0.parseHash((err, authResult) => {
		if (authResult && authResult.idToken) {
			setSession(
				authResult.idToken,
				authResult.idTokenPayload.sub,
				authResult.expiresIn,
			)
		} else if (err) {
			console.error(err)
		}
		navigate('/home/room/join')
	})
}

export const isAuthenticated = () => {
	// Check whether the current time is past the
	// Access Token's expiry time
	const idToken = localStorage.getItem('id_token')
	const expiresAt = localStorage.getItem('expires_at')
	return idToken && (!expiresAt || new Date().getTime() < JSON.parse(expiresAt))
}

export const getUserData = () => {
	const idToken = localStorage.getItem('id_token')
	// we only really care about given_name, family_name, nickname, name, picture, gender, sub
	// and could destructure those jwt_decode(idToken) from here.
	return idToken ? jwt_decode(idToken) : null
}
