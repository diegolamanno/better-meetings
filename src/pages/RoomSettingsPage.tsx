import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

const RoomSettingsPage: FC<RouteComponentProps> = () => (
	<>
		<ul>
			<li>Toggle: Show Me A Timer While Speaking</li>
			{/* <li>Toggle: Public | Require Invitation (stretch ?)</li>
			<li>Toggle: Allow New Joiners</li> */}
			<li>Select: Themes selector</li>
			<li>Select: Language</li>
		</ul>
	</>
)

export default RoomSettingsPage
