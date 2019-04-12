import { createContext } from 'react'
import {
	MachineConfig,
	StateSchema as BaseStateSchema,
	MachineOptions,
	assign,
} from 'xstate'
import { TCreateContext } from 'use-machine'
import { join, queue, yieldTurn, leave } from '../client'
import { retryTransition } from './utilities'
import { Participant } from './types'

type ParticipantWithIsNext = Participant & {
	isNext?: boolean
}

export interface StateSchema extends BaseStateSchema {
	states: {
		absent: {}
		joining: {}
		joined: {
			states: {
				idle: {}
				active: {
					states: {
						queueing: {}
						queued: {}
						up: {}
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

export enum Events {
	JOIN = 'JOIN',
	QUEUE = 'QUEUE',
	YIELD = 'YIELD',
	LEAVE = 'LEAVE',
	RETRY = 'RETRY',
	UP = 'UP',
}

export type NextEvent = {
	type: 'NEXT'
	isNext: boolean
}

type Event =
	| {
			type: keyof typeof Events
	  }
	| NextEvent

export const initialData = { id: '', name: '' }

export const Config: MachineConfig<
	ParticipantWithIsNext,
	StateSchema,
	Event
> = {
	id: 'participant',
	context: initialData,
	initial: 'absent',
	states: {
		absent: {
			on: {
				JOIN: 'joining',
			},
		},
		joining: {
			invoke: {
				id: 'join',
				src: join,
				onDone: {
					target: 'joined',
				},
				onError: {
					target: 'joiningRejected',
				},
			},
		},
		joined: {
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
					onExit: ['clearNext'],
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
						queued: {
							on: {
								NEXT: {
									actions: ['next'],
								},
								UP: 'up',
							},
						},
						up: {},
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
					target: 'absent',
				},
				onError: {
					target: 'leavingRejected',
				},
			},
		},
		joiningRejected: retryTransition('joining'),
		leavingRejected: retryTransition('leaving'),
	},
}

export const Options: Partial<MachineOptions<ParticipantWithIsNext, Event>> = {
	actions: {
		clearNext: assign(context => {
			const newContext = { ...context }
			newContext.isNext = false
			return newContext
		}),
		next: assign((context, event) => {
			const newContext = { ...context }
			newContext.isNext = (event as NextEvent).isNext
			return newContext
		}),
	},
}

type TMachine = TCreateContext<ParticipantWithIsNext, StateSchema, Event>

export const Context = createContext({} as TMachine)

export type State =
	| keyof StateSchema['states']
	| keyof StateSchema['states']['joined']['states']
	| keyof StateSchema['states']['joined']['states']['active']['states']
	| 'next'
