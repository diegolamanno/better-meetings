import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { Global, css } from '@emotion/core'
import { variables as styleVars } from '@styles'
import {
	ApolloProvider,
	AttendeeProvider,
	RoomProvider,
	AuthProvider,
	PusherProvider,
} from '@providers'
import { Routes } from '@components'

export const ColdApp: FC = () => (
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

export const App = hot(module)(ColdApp)

export default App
