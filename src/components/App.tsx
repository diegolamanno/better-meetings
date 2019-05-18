import React, { FC } from 'react'
import ApolloProvider from 'react-apollo/ApolloProvider'
import { hot } from 'react-hot-loader'
import Client from '../client'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'
import Layout from './Layout'
import Routes from './Routes'

const App: FC = () => (
	<ApolloProvider client={Client}>
		<AttendeeProvider>
			<RoomProvider>
				<Layout>
					<Routes />
				</Layout>
			</RoomProvider>
		</AttendeeProvider>
	</ApolloProvider>
)

export default hot(module)(App)
