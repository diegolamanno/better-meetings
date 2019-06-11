import React, {
	FC,
	ReactNode,
	useContext,
	useEffect,
	createContext,
} from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types'
import { AttendeeContext } from '../providers/AttendeeProvider'
import { subscribeToRoom } from '../gql/queries'
import { SubscriptionData, Room } from '../types'
import { roomSubscription } from '../gql/converters'
import { getQueuePosition } from '../utilities'

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

	const { loading, error, data } = useSubscription<
		SubscriptionData<'room'>,
		{},
		NormalizedCacheObject
	>(subscribeToRoom, {
		variables: { name: attendeeState.context.roomName },
		skip: !attendeeState.matches('authenticated.present'),
	})

	const room = data ? roomSubscription(data)[0] : ({} as Room)

	const currentQueuePosition = data
		? getQueuePosition(attendeeState.context.userID, data.room[0].queue)
		: -1

	useEffect(() => {
		if (currentQueuePosition !== -1) {
			attendeeSend({
				type: 'QUEUE_POSITION_CHANGED',
				data: currentQueuePosition,
			})
		}
	}, [currentQueuePosition, attendeeState.context.queuePosition])

	if (loading || error || !data) {
		return <Provider room={{} as Room}>{children}</Provider>
	}

	return <Provider room={room}>{children}</Provider>
}
export default RoomProvider
