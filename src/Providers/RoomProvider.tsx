import React, { FC, ReactNode } from 'react'
import { Subscription } from 'react-apollo'
import { useMachine } from 'use-machine'
import { Config, Options, Context } from '../state/RoomMachine'
import { subscribeToRoom } from '../queries'
import { Room } from '../state/types'

const RoomProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, Options)

	const readyToSubscribe = machine.state.matches('readyToSubscribe')

	const Provider = () => (
		<Context.Provider value={machine}>{children}</Context.Provider>
	)

	return !readyToSubscribe ? (
		<Provider />
	) : (
		<Subscription<Room>
			subscription={subscribeToRoom}
			variables={{ roomName: machine.context.name }}
		>
			{({ loading, data, error }) => {
				if (!loading && !error && data) {
					const newData = { ...data }
					machine.send({
						data: newData,
						type: 'UPDATE',
					})
				} else {
					// machine.send({
					// 	type: 'UNSUBSCRIBE',
					// })
				}
				return <Context.Provider value={machine}>{children}</Context.Provider>
			}}
		</Subscription>
	)
}

export default RoomProvider
