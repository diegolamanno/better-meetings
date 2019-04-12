import React, { FC, ReactNode } from 'react'
import { Query } from 'react-apollo'
import { useMachine } from 'use-machine'
import { Config, Options, Context } from '../state/ParticipantMachine'

const ParticipantProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, Options)

	return (
		<Query>
			{({ loading, error, data }) => (
				<Context.Provider value={machine}>{children}</Context.Provider>
			)}
		</Query>
	)
}

export default ParticipantProvider
