import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { Global, css } from '@emotion/core'
import { ApolloProvider } from 'react-apollo-hooks'
import { variables as styleVars } from '@styles'
import { AttendeeProvider, RoomProvider, AuthProvider } from '@providers'
import { Routes } from '@components'
import { ApolloClient } from '@services'

export const ColdApp: FC = () => (
	<AuthProvider>
		<ApolloProvider client={ApolloClient}>
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
	</AuthProvider>
)

export const App = hot(module)(ColdApp)

export default App
