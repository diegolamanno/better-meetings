import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import { isAuthenticated, login, logout } from '../auth/Auth'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'

const App: FC<import('@reach/router').RouteComponentProps> = ({ children }) => (
	<AttendeeProvider>
		<RoomProvider>
			<Global
				styles={css`
					html {
						box-sizing: border-box;
					}

					*,
					*::before,
					*::after {
						box-sizing: inherit;
					}
				`}
			/>
			<div className="navbar">
				<span>
					<a href="#">Auth0 - React</a>

					{!isAuthenticated() && (
						<button className="btn-margin" onClick={() => login()}>
							Log In
						</button>
					)}
					{isAuthenticated() && (
						<button className="btn-margin" onClick={() => logout()}>
							Log Out
						</button>
					)}
				</span>
			</div>
			{children}
		</RoomProvider>
	</AttendeeProvider>
)

export default App
