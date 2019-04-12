import { createContext } from 'react'
import { MachineConfig, StateSchema as BaseStateSchema } from 'xstate'
import { TCreateContext } from 'use-machine'
import { Room } from './types'

export interface StateSchema extends BaseStateSchema {
	states: {
		unsubscribed: {}
		subscribed: {}
	}
}

export type UpdateEvent = {
	type: 'UPDATE'
	data: Room
}

export type Event =
	| {
			type: 'UNSUBSCRIBE'
	  }
	| UpdateEvent

export const initialData: Room = {
	id: '',
	name: '',
	participants: [],
	queue: [],
}

export const Config: MachineConfig<Room, StateSchema, Event> = {
	id: 'room',
	context: initialData,
	initial: 'unsubscribed',
	states: {
		unsubscribed: {
			on: {
				UPDATE: {
					target: 'subscribed',
					actions: ['update'],
				},
			},
		},
		subscribed: {
			on: {
				UPDATE: {
					actions: ['update'],
				},
				UNSUBSCRIBE: {
					target: 'unsubscribed',
					actions: ['clear'],
				},
			},
		},
	},
}

type TMachine = TCreateContext<Room, StateSchema, Event>

export const Context = createContext({} as TMachine)
