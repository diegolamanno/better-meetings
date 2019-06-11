import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import styleVars from '../styles/variables'
import { AuthContext } from '../providers/AuthProvider'

const Nav = styled.nav`
	width: 100%;
	background-color: ${styleVars.palette.secondary};
	padding: 10px;
`

const NavBar: FC = () => {
	const authContext = useContext(AuthContext)

	const authOnClick = authContext.isAuthenticated
		? authContext.logout
		: authContext.login
	const authenticating = !authContext.isAuthenticated && !authContext.ready
	const authLabel = authenticating
		? 'Loading...'
		: authContext.isAuthenticated
		? 'Logout'
		: 'Login'

	return (
		<Nav>
			<button
				onClick={() => {
					authOnClick()
				}}
			>
				{authLabel}
			</button>
		</Nav>
	)
}

export default NavBar
