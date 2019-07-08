import React, {
	ComponentProps,
	RefForwardingComponent,
	memo,
	forwardRef,
} from 'react'
import { css } from '@emotion/core'
import { SerializedStyles } from '@emotion/utils/types'

type Props = {
	label: string
	styles?: SerializedStyles
} & ComponentProps<'input'>

const Input: RefForwardingComponent<HTMLInputElement, Props> = (
	{ styles, label, ...rest },
	ref,
) => (
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
)

const MemoizedInput = memo(forwardRef(Input))

export { MemoizedInput as Input }

export default MemoizedInput
