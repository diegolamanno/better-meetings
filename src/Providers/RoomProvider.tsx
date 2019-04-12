import React, { FC, ReactNode } from 'react'
import { gql } from 'apollo-boost'
import { Subscription } from 'react-apollo'
import { useMachine } from 'use-machine'
import { Config, Options, Context } from '../state/RoomMachine'
import { Room } from '../state/types'

const RoomProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, Options)

	const DUMMY_SUBSCRIPTION = gql`
		subscription onCommentAdded($repoFullName: String!) {
			commentAdded(repoFullName: $repoFullName) {
				id
				content
			}
		}
	`

	return (
		<Subscription<Room>
			subscription={DUMMY_SUBSCRIPTION}
			variables={{ foo: 'bar' }}
		>
			{({ loading, data, error }) => {
				if (!loading && !error && data) {
					const newData = { ...data }
					machine.send({
						data: newData,
						type: 'UPDATE',
					})
				} else {
					machine.send({
						type: 'UNSUBSCRIBE',
					})
				}
				return <Context.Provider value={machine}>{children}</Context.Provider>
			}}
		</Subscription>
	)
}

export default RoomProvider
