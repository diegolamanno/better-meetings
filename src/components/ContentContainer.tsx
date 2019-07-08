import React, { FC, ReactNode } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { variables as styleVars } from '@styles'

interface Props {
	children: ReactNode
	customMaxWidth?: number | null | undefined
	customPadding?: string | null | undefined
}

const styleConsts = {
	max: '1200px',
	padding: '20px',
	paddingLarge: '30px',
}

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 560px;
	padding: 0 ${styleConsts.padding};

	@media (min-width: ${styleVars.mediaQueries.min}) {
		max-width: ${styleConsts.max};
		padding: 0 ${styleConsts.paddingLarge};
	}
`

export const ContentContainer: FC<Props> = props => {
	const { customMaxWidth, children, customPadding } = props
	const customExists = customMaxWidth || customPadding
	const customStyle = customExists
		? css`
				max-width: ${customMaxWidth};
				padding: ${customPadding};
		  `
		: ''

	return (
		<Container data-qa-component="content-container" css={customStyle}>
			{children}
		</Container>
	)
}

ContentContainer.defaultProps = {
	customMaxWidth: null,
	customPadding: null,
}

export default ContentContainer
