import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
} from 'react'
import { useMachine } from '@xstate/react'
import { AuthContext } from '@providers'
import AttendeeMachine, {
	Schema,
	Context,
	Event,
} from '../state/AttendeeMachine'
import { ApolloClient } from '@services'
import { getUser, addUser } from '../gql/queries.graphql'
import { MutationResult, Query, GQL } from '../types'

type AttendeeState = import('xstate').State<Context, Event>
type AttendeeSend = import('xstate/lib/interpreter').Interpreter<
	Context,
	Schema,
	Event
>['send']

interface ContextType {
	state: AttendeeState
	send: AttendeeSend
}

export const AttendeeContext = createContext<ContextType>({
	state: AttendeeMachine.initialState,
	send: () => {
		throw new Error('Cannot use "send" without the AttendeeContext povider!')
	},
})

export const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)

	const [state, send] = useMachine(AttendeeMachine)

	useEffect(() => {
		if (state.matches('unauthenticated') && authContext.isAuthenticated) {
			const userData = authContext.getUserData()
			ApolloClient.query<Query<'user'>, GQL.GetUserQueryVariables>({
				query: getUser,
				variables: {
					authID: userData.sub,
				},
			}).then(async result => {
				if (!result.data.user.length) {
					await ApolloClient.mutate<
						MutationResult<'insert_user'>,
						GQL.AddUserMutationVariables
					>({
						mutation: addUser,
						variables: {
							authID: userData.sub,
							avatar: userData.picture,
							name: userData.nickname || userData.given_name || userData.name,
						},
					})
				}

				send({
					type: 'DID_AUTHENTICATE',
					userID: userData.sub,
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
