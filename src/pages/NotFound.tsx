import React, { FC, memo } from 'react'
import { RouteComponentProps } from '@reach/router'

export const NotFound: FC<RouteComponentProps> = memo(() => (
	<div>Sorry, nothing here.</div>
))

export default NotFound
