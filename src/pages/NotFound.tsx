import React, { FC, memo } from 'react'
import { RouteComponentProps } from '@reach/router'

const NotFound: FC<RouteComponentProps> = () => <div>Sorry, nothing here.</div>

const MemoizedNotFound = memo(NotFound)

export { MemoizedNotFound as NotFound }

export default MemoizedNotFound
