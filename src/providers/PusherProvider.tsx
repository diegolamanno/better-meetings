import React, {
	FC,
	ReactNode,
	useEffect,
	useContext,
	useCallback,
	createContext,
} from 'react'
import Pusher, { Authorizer } from 'pusher-js'
import { AuthContext } from '@providers'
import { PusherAuthRequestData } from '../types'

const getAuthorizer = (getToken: () => string): Authorizer => channel => ({
	authorize: async (socketID, callback) => {
		const requestData: PusherAuthRequestData = {
			socket_id: socketID,
			channel_name: channel.name,
		}
		const response = await fetch(CONFIG.pusher.authEndpoint, {
			body: JSON.stringify(requestData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${getToken()}`,
			},
		})

		if (response) {
			const auth = await response.json()
			callback(false, auth)
		} else {
			callback(true)
		}
	},
})

type ContextType = Pusher.Pusher

const pusher = new Pusher(CONFIG.pusher.key, {
	cluster: CONFIG.pusher.cluster,
	forceTLS: true,
	disableStats: true,
})

export const PusherContext = createContext<ContextType>(pusher)

export const PusherProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const getToken = useCallback(() => authContext.idToken || '', [
		authContext.idToken,
	])

	useEffect(() => {
		pusher.config.authorizer = getAuthorizer(getToken)
	}, [])

	return (
		<PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
	)
}

export default PusherProvider
