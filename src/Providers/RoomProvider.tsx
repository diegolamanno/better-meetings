import React, { FC, ReactNode, useContext } from 'react'
import { gql } from 'apollo-boost'
import { Subscription } from 'react-apollo'
import { useMachine } from 'use-machine'
import { assign } from 'xstate'
import { Config, UpdateEvent, Context } from '../state/RoomMachine'
import { Context as AttendeeContext } from '../state/AttendeeMachine'
import { Room } from '../state/types'

const RoomProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const machine = useMachine(Config, {
		actions: {
			update: assign((_context, event) => (event as UpdateEvent).data),
			clear: assign(() => ({})),
		},
	})

	const attendeeMachine = useContext(AttendeeContext)

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

					if (newData.queue[0]) {
						if (newData.queue[0].id === attendeeMachine.context.id) {
							attendeeMachine.send('NEXT')
						}
					}

					machine.send({
						data: newData,
						type: 'UPDATE',
					})
				} else {
					machine.send({
						type: 'UNSUBSCRIBE',
					})
				}
				if (data && data.queue.length && data.queue[0].id) {
					return <Context.Provider value={machine}>{children}</Context.Provider>
				}
			}}
		</Subscription>
	)
}

export default RoomProvider
