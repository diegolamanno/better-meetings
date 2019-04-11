import React, { Component } from 'react'
import { Global, css } from '@emotion/core'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { hot } from 'react-hot-loader'
import { RouteComponentProps } from '@reach/router'

import Auth from '../auth/Auth'

const GET_MEETINGS = gql`
	query {
		meeting {
			id
			name
		}
	}
`

interface Props extends RouteComponentProps {
	history: any
	auth: any
}

const auth = new Auth()
auth.login()

class App extends Component<Props> {
	goTo(route) {
		this.props.history.replace(`/${route}`)
	}

	login() {
		this.props.auth.login()
	}

	logout() {
		this.props.auth.logout()
	}

	componentDidMount() {
		const { renewSession } = this.props.auth

		if (localStorage.getItem('isLoggedIn') === 'true') {
			renewSession()
		}
	}

	render() {
		const { isAuthenticated } = this.props.auth

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
						<button
							bsStyle="primary"
							className="btn-margin"
							onClick={this.goTo.bind(this, 'home')}
						>
							Home
						</button>
						{!isAuthenticated() && (
							<button
								bsStyle="primary"
								className="btn-margin"
								onClick={this.login.bind(this)}
							>
								Log In
							</button>
						)}
						{isAuthenticated() && (
							<button
								bsStyle="primary"
								className="btn-margin"
								onClick={this.logout.bind(this)}
							>
								Log Out
							</button>
						)}
					</span>
				</div>
				{!isAuthenticated() && (
					<Query query={GET_MEETINGS}>
						{({ loading, error, data }) => {
							if (loading) return <div>Loading...</div>
							if (error) return <div>Error :(</div>
							console.log(data.meeting)
							return data.meeting.map(meet => <span>{meet.name} - </span>)
						}}
					</Query>
				)}
			</>
		)
	}
}

export default hot(module)(App)
