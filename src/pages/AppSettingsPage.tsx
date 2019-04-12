import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { logout } from '../auth/Auth'

const AppSettingsPage: FC<RouteComponentProps> = () => (
	<>
		<ul>
			<li>[USER IDENTIFIER?]</li>
			<li>Toggle: Haptics</li>
			<li>Toggle: Reduce motion</li>
			<li>
				<button className="btn-margin" onClick={() => logout()}>
					Log Out
				</button>
			</li>
		</ul>
	</>
)

export default AppSettingsPage
