import React, { FC } from 'react'
import styled from '@emotion/styled'
import variables from '../styles/variables'
import { isAuthenticated, login, logout } from '../auth/Auth'

const Nav = styled.nav`
	width: 100%;
	background-color: ${variables.palette.secondary};
	padding: 10px;
`

const NavBar: FC = () => (
	<Nav>
		{isAuthenticated() ? (
			<button onClick={logout}>Logout</button>
		) : (
			<button onClick={login}>Login</button>
		)}
	</Nav>
)

export default NavBar
