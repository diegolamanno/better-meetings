import React, {
	FC,
	ReactNode,
	useContext,
	useState,
	createContext,
} from 'react'
import Subscription from 'react-apollo/Subscriptions'
import { Context as AttendeeContext } from '../providers/AttendeeProvider'
import { subscribeToRoom } from '../gql/queries'
import { Room } from '../types'
import { Subscription_Root } from '../gql/types'
import { roomSubscription } from '../gql/converters'

export const Context = createContext({} as Room)

const Provider: FC<{
	room: Room
	children: ReactNode
}> = ({ room, children }) => (
	<Context.Provider value={room}>{children}</Context.Provider>
)

const RoomProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)
	const [prevQueuePosition, setCurrentQueuePosition] = useState<number>(-1)

	return attendeeState.matches('authenticated.present') ? (
		<Subscription<Subscription_Root>
			subscription={subscribeToRoom}
			variables={{ roomName: attendeeState.context.roomName }}
		>
			{({ loading, data, error }) => {
				let room = {} as Room
				if (!loading && !error && data) {
					room = roomSubscription(data)[0]
					const currentQueuePosition = room.queue.findIndex(
						attendee => attendee === attendeeState.context.userID,
					)
					if (
						currentQueuePosition !== -1 &&
						currentQueuePosition !== prevQueuePosition
					) {
						attendeeSend({
							type: 'QUEUE_POSITION_CHANGED',
							newPosition: currentQueuePosition,
						})
					}
					setCurrentQueuePosition(currentQueuePosition)
				}
				return <Provider room={room}>{children}</Provider>
			}}
		</Subscription>
	) : (
		<Provider room={{} as Room}>{children}</Provider>
	)
}
export default RoomProvider
