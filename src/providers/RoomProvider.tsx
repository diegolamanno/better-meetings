import React, {
	FC,
	ReactNode,
	useContext,
	useEffect,
	createContext,
} from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types'
import { AttendeeContext } from '@providers'
import { subscribeToRoom } from '../gql/queries.graphql'
import { SubscriptionData, Room } from '../types'
import { roomSubscription } from '../gql/converters'
import { getQueuePosition } from '../utilities'

const initialRoomContext: Room = {
	name: '',
	attendees: {},
	queue: [],
}

export const RoomContext = createContext(initialRoomContext)

const Provider: FC<{
	room: Room
	children: ReactNode
}> = ({ room, children }) => (
	<RoomContext.Provider value={room}>{children}</RoomContext.Provider>
)

export const RoomProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const { state: attendeeState, send: attendeeSend } = useContext(
		AttendeeContext,
	)

	const { data } = useSubscription<
		SubscriptionData<'room'>,
		{},
		NormalizedCacheObject
	>(subscribeToRoom, {
		variables: { name: attendeeState.context.roomName },
		skip: !attendeeState.matches('authenticated.present'),
	})

	const room = data ? roomSubscription(data)[0] : initialRoomContext

	const currentQueuePosition = data
		? getQueuePosition(attendeeState.context.userID, data.room[0].queue)
		: -1

	useEffect(() => {
		if (currentQueuePosition !== -1) {
			attendeeSend({
				type: 'QUEUE_POSITION_CHANGED',
				data: {
					queuePosition: currentQueuePosition,
				},
			})
		}
	}, [currentQueuePosition, attendeeState.context.queuePosition])

	return <Provider room={room}>{children}</Provider>
}
export default RoomProvider
