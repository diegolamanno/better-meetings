import { createContext } from 'react'
import {
	MachineConfig,
	StateSchema as BaseStateSchema,
	MachineOptions,
	assign,
} from 'xstate'
import { TCreateContext } from 'use-machine'
import { queue, yieldTurn, leave } from '../client'
import { retryTransition } from './utilities'
import { Attendee } from './types'

export interface StateSchema extends BaseStateSchema {
	states: {
		offline: {}
		online: {
			states: {
				unsubscribed: {}
				subscribed: {
					states: {
						absent: {}
						present: {
							states: {
								idle: {}
								active: {
									states: {
										queueing: {}
										queued: {}
										queueingRejected: {}
									}
								}
								yielding: {}
								yeldingRejected: {}
							}
						}
						leaving: {}
						leavingRejected: {}
						joiningRejected: {}
					}
				}
			}
		}
	}
}

export type JoinEvent = {
	type: 'LOGIN'
} & Attendee

export type Event =
	| {
			type:
				| 'LOGOUT'
				| 'SUBSCRIBE'
				| 'JOIN'
				| 'QUEUE'
				| 'YIELD'
				| 'LEAVE'
				| 'RETRY'
	  }
	| JoinEvent

const initialData = { id: '', name: '' }

export const Config: MachineConfig<Attendee, StateSchema, Event> = {
	id: 'attendee',
	context: initialData,
	initial: 'offline',
	states: {
		offline: {
			on: {
				LOGIN: {
					target: 'online',
					actions: ['login'],
				},
			},
		},
		online: {
			initial: 'unsubscribed',
			on: {
				LOGOUT: {
					target: 'offline',
					actions: ['logout'],
				},
			},
			states: {
				unsubscribed: {
					on: {
						SUBSCRIBE: 'subscribed',
					},
				},
				subscribed: {
					initial: 'absent',
					states: {
						absent: {
							on: {
								JOIN: {
									target: 'present',
								},
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
										QUEUE: 'active',
									},
								},
								active: {
									initial: 'queueing',
									on: {
										YIELD: 'yielding',
									},
									states: {
										queueing: {
											invoke: {
												id: 'queue',
												src: queue,
												onDone: {
													target: 'queued',
												},
												onError: {
													target: 'queueingRejected',
												},
											},
										},
										queued: {},
										queueingRejected: retryTransition('queueing'),
									},
								},
								yielding: {
									invoke: {
										id: 'yield',
										src: yieldTurn,
										onDone: {
											target: 'idle',
										},
										onError: {
											target: 'yieldingRejected',
										},
									},
								},
								yeldingRejected: retryTransition('yielding'),
							},
						},
						leaving: {
							invoke: {
								id: 'leave',
								src: leave,
								onDone: {
									target: 'online',
								},
								onError: {
									target: 'leavingRejected',
								},
							},
						},
						joiningRejected: retryTransition('joining'),
						leavingRejected: retryTransition('leaving'),
					},
				},
			},
		},
	},
}

export const Options: Partial<MachineOptions<Attendee, Event>> = {
	actions: {
		login: assign((_context, event) => {
			const { id, name } = event as JoinEvent
			return {
				id,
				name,
			}
		}),
		logout: assign(() => initialData),
	},
}

type TMachine = TCreateContext<Attendee, StateSchema, Event>

export const Context = createContext({} as TMachine)

export type State =
	| keyof StateSchema['states']
	| keyof StateSchema['states']['online']['states']
	| keyof StateSchema['states']['online']['states']['subscribed']['states']
	| keyof StateSchema['states']['online']['states']['subscribed']['states']['present']['states']
	| keyof StateSchema['states']['online']['states']['subscribed']['states']['present']['states']['active']['states']
	| 'next'
	| 'up'
