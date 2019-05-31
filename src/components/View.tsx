/** @jsx jsx */

import { FC } from 'react'
import { jsx, css, SerializedStyles } from '@emotion/core'

type Props = { style?: SerializedStyles } & (
	| {
			state: 'idle' | 'nextUp' | 'hasFloor'
			queuePosition?: number
	  }
	| {
			state: 'queued'
			queuePosition: number
	  })

const strokeWeight = 15

const View: FC<Props> = props => {
	const outerRadius = props.state === 'queued' && 125 / props.queuePosition
	const innerRadius =
		props.state === 'queued' &&
		typeof outerRadius === 'number' &&
		outerRadius - strokeWeight / props.queuePosition
	const bcakgroundHeight = props.state === 'queued' && 100 / props.queuePosition

	return (
		<div
			css={[
				css`
					${props.style}
					transition: 0.3s background-color;

					&::before {
						content: '';
						opacity: 0;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						width: 100vh;
						height: 100vh;
						background-image: radial-gradient(
							circle,
							#fff 0%,
							#fff ${innerRadius}%,
							#000 ${innerRadius}%,
							#000 ${outerRadius}%,
							transparent ${outerRadius}%
						);
						background-size: 50% ${bcakgroundHeight}%;
						background-repeat: repeat-y;
						background-position: center top;
						transition: 0.5s background-size 0.3s;
					}
				`,
				props.state === 'idle' &&
					css`
						background-color: #000;
					`,
				(props.state === 'queued' || props.state === 'nextUp') &&
					css`
						background-color: #ffa500;

						&::before {
							opacity: 1;
						}
					`,
				props.state === 'nextUp' &&
					css`
						background-color: #ffa500;

						&::before {
							background-image: radial-gradient(
								closest-side,
								#fff 0%,
								#fff ${100 - strokeWeight * 2}%,
								#000 ${100 - strokeWeight * 2}%,
								#000 ${100 - strokeWeight}%,
								transparent ${100 - strokeWeight}%
							);
							background-size: 100%;
						}
					`,
				props.state === 'hasFloor' &&
					css`
						background-color: #fff;
					`,
			]}
		/>
	)
}

export default View
