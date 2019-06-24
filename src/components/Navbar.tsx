import React, { FC, useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { variables as styleVars } from '@styles'
import { AuthContext } from '@providers'
import { Button } from '@components'

const Nav = styled.nav`
	width: 100%;
	background-color: ${styleVars.palette.secondary};
	padding: 10px;
`

export const NavBar: FC = () => {
	const authContext = useContext(AuthContext)

	return useMemo(
		() => (
			<Nav>
				{authContext.isAuthenticated && (
					<Button
						onClick={() => {
							authContext.logout()
						}}
					>
						Logout
					</Button>
				)}
			</Nav>
		),
		[authContext.isAuthenticated],
	)
}

export default NavBar
