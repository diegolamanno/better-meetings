import React, { FC, ReactNode } from 'react'
import { useMachine } from 'use-machine'
import { ApolloConsumer } from 'react-apollo'
import { Config, Options, Context } from '../state/AttendeeMachine'
import { isAuthenticated } from '../auth/Auth'
import { navigate } from '@reach/router'
import { addUser } from '../queries'

type Props = {
	children: ReactNode
}

const AttendeeProvider: FC<Props> = ({ children }) => {
	const machine = useMachine(Config, Options)

	return (
		<ApolloConsumer>
			{client => {
				if (machine.state.matches('offline') && isAuthenticated()) {
					const jwt = localStorage.getItem('id_token') as string
					const sub = localStorage.getItem('sub') as string

					machine.send({
						name: sub,
						id: jwt,
						type: 'LOGIN',
					})

					if (!machine.state.matches('subscribed')) {
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
					}
				} else if (!machine.state.matches('offline') && !isAuthenticated()) {
					machine.send('LOGOUT')
				}

				return <Context.Provider value={machine}>{children}</Context.Provider>
			}}
		</ApolloConsumer>
	)
}

export default AttendeeProvider
