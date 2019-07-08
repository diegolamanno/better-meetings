import React, { FC, ComponentProps, ReactNode } from 'react'
import { css } from '@emotion/core'
import { SerializedStyles } from '@emotion/utils/types'

export const Button: FC<
	{
		children: ReactNode
		styles?: SerializedStyles
	} & ComponentProps<'button'>
> = ({ children, styles, ...rest }) => (
	<button
		css={[
			css`
				appearance: none;
			`,
			styles,
		]}
		{...rest}
	>
		{children}
	</button>
)

Button.defaultProps = {
	type: 'button',
}

export default Button
