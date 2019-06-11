import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { Global, css } from '@emotion/core'
import styleVars from '../styles/variables'
import ApolloProvider from '../providers/ApolloProvider'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'
import AuthProvider from '../providers/AuthProvider'
import PusherProvider from '../providers/PusherProvider'
import Routes from './Routes'

const App: FC = () => (
	<AuthProvider>
		<PusherProvider>
			<ApolloProvider>
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

								body {
									background-color: ${styleVars.palette.primary};
								}
							`}
						/>
						<Routes />
					</RoomProvider>
				</AttendeeProvider>
			</ApolloProvider>
		</PusherProvider>
	</AuthProvider>
)

export default hot(module)(App)
