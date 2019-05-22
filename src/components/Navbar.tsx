import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import variables from '../styles/variables'
import { AuthContext } from '../providers/AuthProvider'

const Nav = styled.nav`
	width: 100%;
	background-color: ${variables.palette.secondary};
	padding: 10px;
`

const NavBar: FC = () => {
	const authContext = useContext(AuthContext)

	return (
		<Nav>
			{authContext.isAuthenticated ? (
				<button
					onClick={() => {
						authContext.logout()
					}}
				>
					Logout
				</button>
			) : !authContext.isAuthenticated && !authContext.idToken ? (
				<button
					onClick={() => {
						authContext.login()
					}}
				>
					Login
				</button>
			) : (
				<button disabled>Loading...</button>
			)}
		</Nav>
	)
}

export default NavBar
