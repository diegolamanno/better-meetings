import { AUTH_STORAGE_KEY } from '../constants'

export const getIdToken = () => {
	const idToken = localStorage.getItem(AUTH_STORAGE_KEY.token)
	if (!idToken) {
		throw new Error('Cannot retrieve session data when not authenticated!')
	}

	return idToken
}

export default getIdToken
