import React, { FC, memo } from 'react'

const Loading: FC = () => <div>Loading...</div>

const MemoizedLoading: FC = memo(Loading)

export { MemoizedLoading as Loading }

export default MemoizedLoading
