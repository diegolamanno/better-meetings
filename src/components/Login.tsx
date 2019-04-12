import React, { Component } from 'react'
import { Global, css } from '@emotion/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { isAuthenticated, login, logout } from '../auth/Auth'

class Login extends Component<RouteComponentProps> {
	componentDidMount() {
		isAuthenticated() && navigate('/home')
	}

	render() {
		return (
			<>
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
					`}
				/>
				<div className="navbar">
					<span>
						<a href="#">Auth0 - React</a>

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
				</div>
			</>
		)
	}
}

export default Login
