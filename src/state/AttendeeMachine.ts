import { Machine, assign } from 'xstate'
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types'
import ApolloClient from 'apollo-client'
import {
	getRoomQuery,
	addAttendeeToRoom,
	createRoom,
	addAttendeeToQueue,
	removeAttendeeFromQueue,
	removeAttendeeFromRoom,
} from '../gql/queries'

import { Attendee, Room, Query, MutationResult } from '../types'

type StateSchema = import('xstate').StateSchema

export interface Schema extends StateSchema {
	states: {
		unauthenticated: {}
		authenticated: {
			states: {
				absent: {}
				joining: {}
				present: {
					states: {
						idle: {}
						queueing: {}
						active: {
							states: {
								queued: {}
								nextUp: {}
								hasFloor: {}
								lastQueuePosition: {}
							}
						}
						yielding: {}

						lastRoomStatus: {}
					}
				}
				leaving: {}
			}
		}
	}
}

export type Context = Attendee & {
	roomID: Room['id']
	roomName: Room['name']
	apolloClient: ApolloClient<NormalizedCacheObject>
	pusher: import('pusher-js').Pusher
}

export type Event<
	E =
		| `DID_AUTHENTICATE`
		| 'JOIN'
		| 'done.invoke.addAttendeeToRoom'
		| 'QUEUE'
		| 'QUEUE_POSITION_CHANGED'
		| 'YIELD'
		| 'LEAVE'
		| 'DID_DEAUTHENTICATE'
> = E extends 'DID_AUTHENTICATE'
	? {
			type: E
			userID: string
	  }
	: E extends 'JOIN'
	? {
			type: E
			roomName: string
	  }
	: E extends 'QUEUE_POSITION_CHANGED'
	? {
			type: E
			newPosition: number
	  }
	: E extends 'done.invoke.addAttendeeToRoom'
	? {
			type: E
			data: Room['id']
	  }
	: {
			type: E
	  }

export const config: import('xstate').MachineConfig<Context, Schema, Event> = {
	id: 'attendee',
	initial: 'unauthenticated',
	states: {
		unauthenticated: {
			on: {
				DID_AUTHENTICATE: {
					target: 'authenticated',
					actions: ['setUserID'],
				},
			},
		},
		authenticated: {
			initial: 'absent',
			states: {
				absent: {
					on: {
						JOIN: {
							target: 'joining',
							actions: ['setRoomName'],
						},
					},
				},
				joining: {
					invoke: {
						src: 'addAttendeeToRoom',
						onDone: {
							target: 'present',
							actions: ['setRoomID'],
						},
						onError: 'absent',
					},
				},
				present: {
					initial: 'idle',
					on: {
						LEAVE: 'leaving',
					},
					states: {
						idle: {
							on: {
								QUEUE: 'queueing',
							},
						},
						queueing: {
							invoke: {
								src: 'addAttendeeToQueue',
								onDone: 'active',
								onError: 'idle',
							},
						},
						active: {
							initial: 'queued',
							on: {
								YIELD: 'yielding',
								QUEUE_POSITION_CHANGED: [
									{
										target: '#attendee.authenticated.present.active.nextUp',
										cond: 'isSecondInQueue',
									},
									{
										target: '#attendee.authenticated.present.active.hasFloor',
										cond: 'isFirstInQueue',
									},
								],
							},
							states: {
								queued: {},
								nextUp: {},
								hasFloor: {},
								lastQueuePosition: {
									type: 'history',
								},
							},
						},
						yielding: {
							invoke: {
								src: 'removeAttendeeFromQueue',
								onDone: '#attendee.authenticated.present.idle',
								onError: 'active.lastQueuePosition',
							},
						},
						lastRoomStatus: {
							type: 'history',
						},
					},
				},
				leaving: {
					invoke: {
						src: 'removeAttendeeFromRoom',
						onDone: '#attendee.authenticated.absent',
						onError: 'present.lastRoomStatus',
					},
				},
			},
		},
	},
}

export const options: Partial<
	import('xstate').MachineOptions<Context, Event>
> = {
	actions: {
		setUserID: assign((context, event) => ({
			...context,
			userID: (event as Event<'DID_AUTHENTICATE'>).userID,
		})),
		setRoomName: assign((context, event) => ({
			...context,
			roomName: (event as Event<'JOIN'>).roomName,
		})),
		setRoomID: assign((context, event) => ({
			...context,
			roomID: (event as Event<'done.invoke.addAttendeeToRoom'>).data,
		})),
	},
	services: {
		addAttendeeToRoom: async ({ userID, roomName, apolloClient, pusher }) => {
			let roomID: Context['roomID']

			const result = await apolloClient.query<Query<'room'>>({
				query: getRoomQuery,
				variables: { name: roomName },
			})

			if (result.data.room.length) {
				roomID = result.data.room[0].id
			} else {
				const newRoom = await apolloClient.mutate<
					MutationResult<'insert_room'>
				>({
					mutation: createRoom,
					variables: {
						name: roomName,
					},
				})

				if (!newRoom.data || !newRoom.data.insert_room) {
					throw new Error()
				}

				roomID = newRoom.data.insert_room.returning[0].id
			}

			const subscription = await new Promise<typeof roomID>(
				(resolve, reject) => {
					pusher
						.subscribe(`presence-${roomID}`)
						.bind('pusher:subscription_succeeded', () => {
							resolve(roomID)
						})
						.bind('pusher:subscription_error', () => {
							reject()
						})
				},
			)

			if (!subscription) {
				throw new Error()
			}

			const room = await apolloClient.mutate<MutationResult<'insert_attendee'>>(
				{
					mutation: addAttendeeToRoom,
					variables: {
						userID,
						roomID,
					},
				},
			)

			if (!room.data) {
				throw new Error()
			}

			return roomID
		},
		addAttendeeToQueue: ({ userID, roomID, apolloClient }) =>
			apolloClient.mutate({
				mutation: addAttendeeToQueue,
				variables: {
					userID,
					roomID,
				},
			}),
		removeAttendeeFromQueue: ({ userID, roomID, apolloClient }) =>
			apolloClient.mutate({
				mutation: removeAttendeeFromQueue,
				variables: {
					userID,
					roomID,
				},
			}),
		removeAttendeeFromRoom: ({ userID, roomID, apolloClient }) =>
			apolloClient.mutate({
				mutation: removeAttendeeFromRoom,
				variables: {
					userID,
					roomID,
				},
			}),
	},
	guards: {
		isSecondInQueue: (_context, event) =>
			(event as Event<'QUEUE_POSITION_CHANGED'>).newPosition === 1,
		isFirstInQueue: (_context, event) =>
			(event as Event<'QUEUE_POSITION_CHANGED'>).newPosition === 0,
	},
}

export default Machine(config, options)

export const createAttendeeMachine = (
	apolloClient: Context['apolloClient'],
	pusher: Context['pusher'],
) =>
	Machine(config, options, {
		apolloClient,
		pusher,
		userID: '',
		roomID: '',
		roomName: '',
	})

export type State =
	| keyof Schema['states']
	| keyof Schema['states']['authenticated']['states']
	| keyof Schema['states']['authenticated']['states']['present']['states']
	| keyof Schema['states']['authenticated']['states']['present']['states']['active']['states']
