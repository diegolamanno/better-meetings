import { TCreateContext } from 'use-machine'
import {
	MachineConfig,
	EventObject,
	MachineOptions,
	OmniEvent,
	State,
	StateSchema,
} from 'xstate'
declare module 'use-machine' {
	export function useMachine<
		TContext = any,
		TState extends StateSchema = any,
		TEvent extends EventObject = any
	>(
		config: MachineConfig<TContext, TState, TEvent>,
		options?: Partial<MachineOptions<TContext, TEvent>>,
		initialContext?: TContext,
	): TCreateContext<TContext, TState, TEvent>
}
