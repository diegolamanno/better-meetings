import React, { FC, ReactNode } from 'react'
import { useMachine } from 'use-machine'
import { Config, Options, Context } from '../state/AttendeeMachine'
import { isAuthenticated, getUserData } from '../auth/Auth'

const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, Options)
	machine.service.onTransition(state => {
		console.log(state)
	})

	if (machine.state.matches('offline') && isAuthenticated()) {
		const user = getUserData() as any

		machine.send({
			type: 'LOGIN',
			id: user.aud,
			name: user.at_hash,
		})
	} else if (!machine.state.matches('offline') && !isAuthenticated()) {
		machine.send('LOGOUT')
	}

	return <Context.Provider value={machine}>{children}</Context.Provider>
}

export default AttendeeProvider
