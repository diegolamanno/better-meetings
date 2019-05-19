import React, { FC } from 'react'
import ApolloProvider from 'react-apollo/ApolloProvider'
import { hot } from 'react-hot-loader'
import Client from '../client'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'
import AuthProvider from '../providers/AuthProvider'
import Routes from './Routes'

const App: FC = () => (
	<AuthProvider>
		<ApolloProvider client={Client}>
			<AttendeeProvider>
				<RoomProvider>
					<Routes />
				</RoomProvider>
			</AttendeeProvider>
		</ApolloProvider>
	</AuthProvider>
)

export default hot(module)(App)
