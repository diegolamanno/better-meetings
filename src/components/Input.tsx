/** @jsx jsx */

import { ComponentProps, memo, forwardRef } from 'react'
import { jsx, css } from '@emotion/core'
import { SerializedStyles } from '@emotion/utils/types'

export const Input = memo(
	forwardRef<
		HTMLInputElement,
		{
			label: string
			styles?: SerializedStyles
		} & ComponentProps<'input'>
	>(({ styles, label, ...rest }, ref) => (
		<label
			css={[
				css`
					display: flex;
					flex-direction: column;
				`,
				styles,
			]}
		>
			{label}
			<input ref={ref} {...rest} />
		</label>
	)),
)

export default Input
