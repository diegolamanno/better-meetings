import { Machine, StateSchema, EventObject } from 'xstate'
import { join, queue, yieldTurn, leave } from '../client'

interface ParticipantStateSchema extends StateSchema {
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

interface ParticipantContext {
	queuePosition: Number | null
}

export enum ParticipantEvents {
	JOIN = 'JOIN',
	QUEUE = 'QUEUE',
	YIELD = 'YIELD',
	LEAVE = 'LEAVE',
	RETRY = 'RETRY',
	UP = 'UP',
}

interface ParticipantEvent extends EventObject {
	type: keyof typeof ParticipantEvents
}

const retry = (state: string) => ({
	on: {
		RETRY: state,
	},
})

const promisedTransition = <T = any>(
	id: string,
	src: () => Promise<T>,
	onDone: string,
	onError: string,
) => ({
	invoke: {
		id,
		src,
		onDone: {
			target: onDone,
		},
		onError: {
			target: onError,
		},
	},
})

export default Machine<
	ParticipantContext,
	ParticipantStateSchema,
	ParticipantEvent
>(
	{
		id: 'participation',
		context: { queuePosition: null },
		initial: 'absent',
		states: {
			absent: {
				on: {
					JOIN: 'joining',
				},
			},
			joining: promisedTransition('join', join, 'joined', 'joiningRejected'),
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
						on: {
							YIELD: 'yielding',
						},
						states: {
							queueing: promisedTransition(
								'queue',
								queue,
								'queued',
								'queueingRejected',
							),
							queued: {
								on: {
									UP: 'up',
								},
							},
							up: {},
							queueingRejected: retry('queueing'),
						},
					},
					yielding: promisedTransition(
						'yield',
						yieldTurn,
						'idle',
						'yeldingRejected',
					),
					yeldingRejected: retry('yielding'),
				},
			},
			leaving: promisedTransition('leave', leave, 'absent', 'leavingRejected'),
			joiningRejected: retry('joining'),
			leavingRejected: retry('leaving'),
		},
	},
	{
		delays: {
			TIMEOUT: 2000,
		},
	},
)
