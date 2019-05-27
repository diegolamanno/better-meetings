import React, {
	FC,
	ReactNode,
	useState,
	useEffect,
	useContext,
	createContext,
} from 'react'
import Pusher, { Authorizer } from 'pusher-js'
import { AuthContext } from '../providers/AuthProvider'
import { TokenStore, PusherAuthRequestData } from '../types'

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

const tokenStore: TokenStore = {
	token: '',
	getToken(this: typeof tokenStore) {
		return this.token
	},
}

type ContextType = Pusher.Pusher

export const PusherContext = createContext<ContextType>({} as ContextType)

const PusherProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const [pusher] = useState(
		new Pusher(CONFIG.pusher.key, {
			cluster: CONFIG.pusher.cluster,
			forceTLS: true,
			disableStats: true,
			authorizer: getAuthorizer(() => tokenStore.getToken()),
		}),
	)

	useEffect(() => {
		if (authContext.idToken) {
			tokenStore.token = authContext.idToken
		}
	}, [authContext.idToken])

	return (
		<PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
	)
}

export default PusherProvider
