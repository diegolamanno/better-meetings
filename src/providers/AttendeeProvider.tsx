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
	Context,
	Event,
} from '../state/AttendeeMachine'

import { getUser, addUser } from '../gql/queries.graphql'
import { MutationResult, Query, GQL } from '../types'

type AttendeeState = import('xstate').State<Context, Event>
type AttendeeSend = import('xstate/lib/interpreter').Interpreter<
	Context,
	Schema,
	Event
>['send']

type ContextType = {
	state: AttendeeState
	send: AttendeeSend
}

export const AttendeeContext = createContext<ContextType>({} as ContextType)

export const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const pusher = useContext(PusherContext)
	const apolloClient = useApolloClient<NormalizedCacheObject>()

	const [state, send] = useMachine(createAttendeeMachine(apolloClient, pusher))

	useEffect(() => {
		if (state.matches('unauthenticated') && authContext.isAuthenticated) {
			apolloClient
				.query<Query<'user'>, GQL.GetUserQueryVariables>({
					query: getUser,
					variables: {
						authID: authContext.userData.sub,
					},
				})
				.then(async result => {
					if (!result.data.user.length) {
						await apolloClient.mutate<
							MutationResult<'insert_user'>,
							GQL.AddUserMutationVariables
						>({
							mutation: addUser,
							variables: {
								authID: authContext.userData.sub,
								avatar: authContext.userData.picture,
								name:
									authContext.userData.nickname ||
									authContext.userData.given_name ||
									authContext.userData.name,
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

	return (
		<AttendeeContext.Provider value={{ state, send }}>
			{children}
		</AttendeeContext.Provider>
	)
}

export default AttendeeProvider
