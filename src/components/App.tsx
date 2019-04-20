import React, { FC } from 'react'
import styled from '@emotion/styled'
import { isAuthenticated, login, logout } from '../auth/Auth'
import AttendeeProvider from '../providers/AttendeeProvider'
import RoomProvider from '../providers/RoomProvider'
import globalStyles from '../styles/variables'
import Layout from './Layout'
import ContentContainer from './ContentContainer'

const NavBar = styled.div`
	width: 100%;
	background-color: ${globalStyles.palette.secondary};
	padding: 10px;
`

const App: FC<import('@reach/router').RouteComponentProps> = ({ children }) => (
	<AttendeeProvider>
		<RoomProvider>
			<Layout>
				<NavBar>
					<span>
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
				</NavBar>
				<ContentContainer>{children}</ContentContainer>
			</Layout>
		</RoomProvider>
	</AttendeeProvider>
)

export default App
