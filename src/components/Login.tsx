import React, { Component } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { isAuthenticated, login, logout } from '../auth/Auth'
import Layout from './Layout'
import ContentContainer from './ContentContainer'

class Login extends Component<RouteComponentProps> {
	componentDidMount() {
		isAuthenticated() && navigate('/home')
	}

	render() {
		return (
			<Layout>
				<ContentContainer>
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
				</ContentContainer>
			</Layout>
		)
	}
}

export default Login
