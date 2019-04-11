import React, { FC } from 'react'
import { interpret } from 'xstate'
import participationMachine, {
	ParticipantEvents,
} from '../state/participationMachine'

const promiseService = interpret(participationMachine).onTransition(state =>
	console.log(JSON.stringify(state.value)),
)

const events = Object.values(
	ParticipantEvents,
) as (keyof typeof ParticipantEvents)[]

promiseService.start()

const Live: FC = () => (
	<div className="dd">
		{events.map(event => (
			<button key={event} onClick={() => promiseService.send(event)}>
				{event}
			</button>
		))}
	</div>
)

export default Live
