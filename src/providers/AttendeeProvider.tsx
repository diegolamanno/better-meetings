import React, { FC, ReactNode, createContext } from 'react'
import { useMachine } from '@xstate/react'
import ApolloConsumer from 'react-apollo/ApolloConsumer'
import { navigate } from '@reach/router'
import attendeeMachine, {
	Schema,
	Context as AttendeeContext,
	Event,
} from '../state/AttendeeMachine'
import { isAuthenticated } from '../auth/Auth'

import { addUser } from '../gql/queries'

type AttendeeState = import('xstate').State<AttendeeContext, Event>
type AttendeeOmniEvent = import('xstate').OmniEvent<Event>
type AttendeeSend = import('xstate/lib/interpreter').Interpreter<
	AttendeeContext,
	Schema,
	Event
>['send']

export const Context = createContext({
	state: {} as AttendeeState,
	send: ((_event: AttendeeOmniEvent) => ({})) as AttendeeSend,
})

const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const [attendeeState, attendeeSend] = useMachine(attendeeMachine)
	return (
		<ApolloConsumer>
			{client => {
				if (attendeeState.matches('unauthenticated') && isAuthenticated()) {
					const jwt = localStorage.getItem('id_token') as string
					const sub = localStorage.getItem('sub') as string

					attendeeSend({
						type: 'DID_AUTHENTICATE',
						userId: sub,
						token: jwt,
					})

					client
						.mutate({
							mutation: addUser,
							variables: { jwt, user: sub, email: 'foo', avatar: 'foo' },
						})
						.then(() => {
							navigate('/home')
						})
						.catch(() => {
							// already subscribed
						})
				} else if (
					attendeeState.matches('authenticated') &&
					!isAuthenticated()
				) {
					attendeeSend('DID_DEAUTHENTICATE')
				}
				return (
					<Context.Provider
						value={{ state: attendeeState, send: attendeeSend }}
					>
						{children}
					</Context.Provider>
				)
			}}
		</ApolloConsumer>
	)
}

export default AttendeeProvider
