import React, { FC, ReactNode } from 'react'
import { useMachine } from 'use-machine'
import { Config, Options, Context } from '../state/AttendeeMachine'

const AttendeeProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, Options)

	return <Context.Provider value={machine}>{children}</Context.Provider>
}

export default AttendeeProvider
