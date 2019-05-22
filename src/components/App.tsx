import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import ApolloProvider from '../providers/ApolloProvider'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'
import AuthProvider from '../providers/AuthProvider'
import Routes from './Routes'

const App: FC = () => (
	<AuthProvider>
		<ApolloProvider>
			<AttendeeProvider>
				<RoomProvider>
					<Routes />
				</RoomProvider>
			</AttendeeProvider>
		</ApolloProvider>
	</AuthProvider>
)

export default hot(module)(App)
