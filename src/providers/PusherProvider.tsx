import React, {
	FC,
	ReactNode,
	useEffect,
	useContext,
	createContext,
} from 'react'
import Pusher, { Authorizer } from 'pusher-js'
import { AuthContext } from '@providers'
import { PusherAuthRequestData } from '../types'

const getAuthorizer = (token: string): Authorizer => channel => ({
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
				authorization: `Bearer ${token}`,
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

	useEffect(() => {
		if (authContext.idToken) {
			pusher.config.authorizer = getAuthorizer(authContext.idToken)
		}
	}, [authContext.idToken])

	return (
		<PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
	)
}

export default PusherProvider
