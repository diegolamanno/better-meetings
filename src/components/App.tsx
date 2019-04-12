import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import { RouteComponentProps } from '@reach/router'
import { isAuthenticated, login, logout } from '../auth/Auth'
import AttendeeProvider from '../Providers/AttendeeProvider'
import RoomProvider from '../Providers/RoomProvider'

const App: FC<RouteComponentProps> = ({ children }) => (
	<RoomProvider>
		<AttendeeProvider>
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
		</AttendeeProvider>
	</RoomProvider>
)

export default App
