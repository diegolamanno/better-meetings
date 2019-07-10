import { Machine, assign, MachineConfig, MachineOptions } from 'xstate'
import { ApolloClient, Pusher } from '@services'
import {
	getRoom,
	addAttendeeToRoom,
	createRoom,
	addAttendeeToQueue,
	removeAttendeeFromQueue,
	removeAttendeeFromRoom,
} from '../gql/queries.graphql'
import { getQueuePosition } from '../utilities'

import { Attendee, Room, Query, MutationResult, GQL } from '../types'

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
	userID: GQL.User['auth_id']
	roomID: GQL.Room['id']
	roomName: Room['name']
	queuePosition?: number
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
			userID: Context['userID']
	  }
	: E extends 'JOIN'
	? {
			type: E
			roomName: Context['roomName']
	  }
	: E extends 'QUEUE_POSITION_CHANGED'
	? {
			type: E
			data: {
				queuePosition: Exclude<Context['queuePosition'], undefined>
			}
	  }
	: E extends 'done.invoke.addAttendeeToRoom'
	? {
			type: E
			data: {
				roomID: Context['roomID']
			}
	  }
	: {
			type: E
	  }

const queuePositionChangedTransition = [
	{
		target: '#attendee.authenticated.present.active.nextUp',
		actions: 'setQueuePosition',
		cond: 'isSecondInQueue',
	},
	{
		target: '#attendee.authenticated.present.active.hasFloor',
		actions: 'setQueuePosition',
		cond: 'isFirstInQueue',
	},
]

const queuedTransition = [
	...queuePositionChangedTransition,
	{
		target: '#attendee.authenticated.present.active.queued',
		actions: 'setQueuePosition',
	},
]

const config: MachineConfig<Context, Schema, Event> = {
	id: 'attendee',
	context: {
		userID: '',
		name: '',
		avatar: '',
		roomID: '',
		roomName: '',
	},
	initial: 'unauthenticated',
	states: {
		unauthenticated: {
			on: {
				DID_AUTHENTICATE: {
					target: 'authenticated',
					actions: 'setUserID',
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
							actions: 'setRoomName',
						},
					},
				},
				joining: {
					invoke: {
						src: 'addAttendeeToRoom',
						onDone: {
							target: 'present',
							actions: 'setRoomID',
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
								onDone: queuedTransition,
								onError: 'idle',
							},
						},
						active: {
							initial: 'queued',
							on: {
								YIELD: 'yielding',
								QUEUE_POSITION_CHANGED: queuePositionChangedTransition,
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
								onDone: {
									target: '#attendee.authenticated.present.idle',
									actions: 'clearQueuePosition',
								},
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
						onDone: {
							target: '#attendee.authenticated.absent',
							actions: 'clearRoomFromContext',
						},
						onError: 'present.lastRoomStatus',
					},
				},
			},
		},
	},
}

const options: Partial<MachineOptions<Context, Event>> = {
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
			roomID: (event as Event<'done.invoke.addAttendeeToRoom'>).data.roomID,
		})),
		setQueuePosition: assign((context, event) => ({
			...context,
			queuePosition: (event as Event<'QUEUE_POSITION_CHANGED'>).data
				.queuePosition,
		})),
		clearQueuePosition: assign(context => ({
			...context,
			queuePosition: undefined,
		})),
		clearRoomFromContext: assign(context => ({
			...context,
			roomID: undefined,
			roomName: undefined,
		})),
	},
	services: {
		addAttendeeToRoom: async ({ userID, roomName }) => {
			let roomID: Context['roomID']

			const result = await ApolloClient.query<
				Query<'room'>,
				GQL.GetRoomQueryVariables
			>({
				query: getRoom,
				variables: { name: roomName },
			})

			if (result.data.room.length) {
				roomID = result.data.room[0].id
			} else {
				const newRoom = await ApolloClient.mutate<
					MutationResult<'insert_room'>,
					GQL.CreateRoomMutationVariables
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
					Pusher.subscribe(`presence-${roomID}`)
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

			const room = await ApolloClient.mutate<
				MutationResult<'insert_attendee'>,
				GQL.AddAttendeeToRoomMutationVariables
			>({
				mutation: addAttendeeToRoom,
				variables: {
					userID,
					roomID,
				},
			})

			if (
				!room.data ||
				!room.data.insert_attendee ||
				room.data.insert_attendee.affected_rows <= 0
			) {
				throw new Error()
			}

			return { roomID }
		},
		addAttendeeToQueue: async ({ userID, roomID }) => {
			const result = await ApolloClient.mutate<
				MutationResult<'insert_queue_record'>,
				GQL.AddAttendeeToQueueMutationVariables
			>({
				mutation: addAttendeeToQueue,
				variables: {
					userID,
					roomID,
				},
			})
			if (
				!result.data ||
				!result.data.insert_queue_record ||
				!result.data.insert_queue_record.returning.length
			) {
				throw new Error()
			}
			return {
				queuePosition: getQueuePosition(
					userID,
					result.data.insert_queue_record.returning[0].room.queue,
				),
			}
		},
		removeAttendeeFromQueue: async ({ userID, roomID }) => {
			await ApolloClient.mutate<
				MutationResult<'delete_queue_record'>,
				GQL.RemoveAttendeeFromQueueMutationVariables
			>({
				mutation: removeAttendeeFromQueue,
				variables: {
					userID,
					roomID,
				},
			})

			return {}
		},
		removeAttendeeFromRoom: async ({ userID, roomID }) => {
			await ApolloClient.mutate<
				MutationResult<'delete_attendee'>,
				GQL.RemoveAttendeeFromRoomMutationVariables
			>({
				mutation: removeAttendeeFromRoom,
				variables: {
					userID,
					roomID,
				},
			})

			Pusher.unsubscribe(`presence-${roomID}`)

			return {}
		},
	},
	guards: {
		isSecondInQueue: (_context, event) =>
			(event as Event<'QUEUE_POSITION_CHANGED'>).data.queuePosition === 1,
		isFirstInQueue: (_context, event) =>
			(event as Event<'QUEUE_POSITION_CHANGED'>).data.queuePosition === 0,
	},
}

export default Machine(config, options)
