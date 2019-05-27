import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
} from 'react'
import { useMachine } from '@xstate/react'
import { AuthContext } from './AuthProvider'
import { PusherContext } from './PusherProvider'
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types'
import { useApolloClient } from 'react-apollo-hooks'
import {
	createAttendeeMachine,
	Schema,
	Context as AttendeeContext,
	Event,
} from '../state/AttendeeMachine'

import { getUser, addUser } from '../gql/queries'
import { MutationResult, Query } from '../types'

type AttendeeState = import('xstate').State<AttendeeContext, Event>
type AttendeeSend = import('xstate/lib/interpreter').Interpreter<
	AttendeeContext,
	Schema,
	Event
>['send']

type ContextType = {
	state: AttendeeState
	send: AttendeeSend
}

export const Context = createContext<ContextType>({} as ContextType)

const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const pusher = useContext(PusherContext)
	const apolloClient = useApolloClient<NormalizedCacheObject>()

	const [state, send] = useMachine(createAttendeeMachine(apolloClient, pusher))

	useEffect(() => {
		if (state.matches('unauthenticated') && authContext.isAuthenticated) {
			apolloClient
				.query<Query<'user'>>({
					query: getUser,
					variables: {
						authID: authContext.userData.sub,
					},
				})
				.then(async result => {
					if (!result.data.user.length) {
						await apolloClient.mutate<MutationResult<'insert_user'>>({
							mutation: addUser,
							variables: {
								authID: authContext.userData.sub,
								avatar: authContext.userData.picture,
								name: authContext.userData.name,
							},
						})
					}

					send({
						type: 'DID_AUTHENTICATE',
						userID: authContext.userData.sub,
					})
				})
		} else if (state.matches('authenticated') && !authContext.isAuthenticated) {
			send('DID_DEAUTHENTICATE')
		}
	}, [state.value, authContext.isAuthenticated])

	return <Context.Provider value={{ state, send }}>{children}</Context.Provider>
}

export default AttendeeProvider
