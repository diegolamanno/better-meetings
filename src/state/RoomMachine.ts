import { createContext } from 'react'
import {
	MachineConfig,
	MachineOptions,
	assign,
	StateSchema as BaseStateSchema,
} from 'xstate'
import { TCreateContext } from 'use-machine'
import { Room } from './types'

export interface StateSchema extends BaseStateSchema {
	states: {
		unsubscribed: {}
		readyToSubscribe: {}
		subscribed: {}
	}
}

type UpdateEvent = {
	type: 'UPDATE'
	data: Room
}

type SubscribeEvent = {
	type: 'SUBSCRIBE'
	name: string
}

export type Event =
	| {
			type: 'UNSUBSCRIBE'
	  }
	| UpdateEvent
	| SubscribeEvent

const initialData: Room = {
	name: '',
	attendees: [],
	queue: [],
}

export const Config: MachineConfig<Room, StateSchema, Event> = {
	id: 'room',
	context: initialData,
	initial: 'unsubscribed',
	states: {
		unsubscribed: {
			on: {
				SUBSCRIBE: {
					target: 'readyToSubscribe',
					actions: ['setRoomName'],
				},
			},
		},
		readyToSubscribe: {
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

export const Options: Partial<MachineOptions<Room, Event>> = {
	actions: {
		setRoomName: assign((context, event) => {
			const newContext = { ...context }

			newContext.name = (event as SubscribeEvent).name
			return newContext
		}),
		update: assign((_context, event) => (event as UpdateEvent).data),
		clear: assign(() => initialData),
	},
}

type TMachine = TCreateContext<Room, StateSchema, Event>

export const Context = createContext({} as TMachine)
