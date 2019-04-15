import {
	Machine,
	MachineConfig,
	StateSchema,
	MachineOptions,
	assign,
} from 'xstate'
import client from '../client'
import {
	addAttendeeToRoom,
	addAttendeeToNewRoom,
	addAttendeeToQueue,
	removeAttendeeFromQueue,
	removeAttendeeFromRoom,
} from '../gql/queries'
import { Attendee, Room } from '../types'

export interface Schema extends StateSchema {
	states: {
		unauthenticated: {}
		authenticated: {
			states: {
				absent: {}
				joining: {}
				creating: {}
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
	roomId: Room['id']
	roomName: Room['name']
}

export type Event<
	E =
		| `DID_AUTHENTICATE`
		| 'JOIN'
		| 'CREATE'
		| 'done.invoke.addAttendeeToNewRoom'
		| 'QUEUE'
		| 'QUEUE_POSITION_CHANGED'
		| 'YIELD'
		| 'LEAVE'
		| 'DID_DEAUTHENTICATE'
> = E extends 'DID_AUTHENTICATE'
	? {
			type: E
			userId: string
			token: string
	  }
	: E extends 'JOIN'
	? {
			type: E
			roomId: number
			roomName: string
	  }
	: E extends 'CREATE'
	? {
			type: E
			roomName: string
	  }
	: E extends 'QUEUE_POSITION_CHANGED'
	? {
			type: E
			newPosition: number
	  }
	: E extends 'done.invoke.addAttendeeToNewRoom'
	? {
			type: E
			data: {
				data: {
					insert_room: {
						returning: {
							id: number
						}[]
					}
				}
			}
	  }
	: {
			type: E
	  }

export const config: MachineConfig<Context, Schema, Event> = {
	id: 'attendee',
	initial: 'unauthenticated',
	context: { userId: '', token: '', roomId: 0, roomName: '' },
	states: {
		unauthenticated: {
			on: {
				DID_AUTHENTICATE: {
					target: 'authenticated',
					actions: ['setUserDetails'],
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
							actions: ['setAllRoomDetails'],
						},
						CREATE: {
							target: 'creating',
							actions: ['setNewRoomName'],
						},
					},
				},
				joining: {
					invoke: {
						src: 'addAttendeeToRoom',
						onDone: 'present',
						onError: 'absent',
					},
				},
				creating: {
					invoke: {
						id: 'addAttendeeToNewRoom',
						src: 'addAttendeeToNewRoom',
						onDone: {
							target: 'present',
							actions: ['setNewRoomId'],
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
							},
							states: {
								queued: {
									on: {
										QUEUE_POSITION_CHANGED: {
											target: 'nextUp',
											cond: 'isSecondInQueue',
										},
									},
								},
								nextUp: {
									on: {
										QUEUE_POSITION_CHANGED: {
											target: 'hasFloor',
											cond: 'isFirstInQueue',
										},
									},
								},
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

export const options: Partial<MachineOptions<Context, Event>> = {
	actions: {
		setUserDetails: assign(
			(context, { userId, token }: Event<'DID_AUTHENTICATE'>) => ({
				...context,
				userId,
				token,
			}),
		),
		setAllRoomDetails: assign(
			(context, { roomId, roomName }: Event<'JOIN'>) => ({
				...context,
				roomId,
				roomName,
			}),
		),
		setNewRoomName: assign((context, { roomName }: Event<'CREATE'>) => ({
			...context,
			roomName,
		})),
		setNewRoomId: assign(
			(context, { data }: Event<'done.invoke.addAttendeeToNewRoom'>) => ({
				...context,
				roomId: data.data.insert_room.returning[0].id,
			}),
		),
	},
	services: {
		addAttendeeToRoom: ({ userId, roomId }) =>
			client.mutate({
				mutation: addAttendeeToRoom,
				variables: {
					userId,
					roomId,
				},
			}),
		addAttendeeToNewRoom: ({ userId }, event) => {
			return client.mutate({
				mutation: addAttendeeToNewRoom,
				variables: {
					userId,
					roomName: (event as Event<'CREATE'>).roomName,
				},
			})
		},
		addAttendeeToQueue: ({ userId, roomId }) =>
			client.mutate({
				mutation: addAttendeeToQueue,
				variables: {
					userId,
					roomId,
				},
			}),
		removeAttendeeFromQueue: ({ userId, roomId }) =>
			client.mutate({
				mutation: removeAttendeeFromQueue,
				variables: {
					userId,
					roomId,
				},
			}),
		removeAttendeeFromRoom: ({ userId, roomId }) =>
			client.mutate({
				mutation: removeAttendeeFromRoom,
				variables: {
					userId,
					roomId,
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

export type State =
	| keyof Schema['states']
	| keyof Schema['states']['authenticated']['states']
	| keyof Schema['states']['authenticated']['states']['present']['states']
	| keyof Schema['states']['authenticated']['states']['present']['states']['active']['states']
