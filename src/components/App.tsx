import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { hot } from 'react-hot-loader'
import { RouteComponentProps } from '@reach/router'
import { isAuthenticated, login, logout } from '../auth/Auth'

const GET_MEETINGS = gql`
	query {
		meeting {
			id
			name
		}
	}
`

const App: FC<RouteComponentProps> = props => (
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
					<button
						bsStyle="primary"
						className="btn-margin"
						onClick={() => login()}
					>
						Log In
					</button>
				)}
				{isAuthenticated() && (
					<button
						bsStyle="primary"
						className="btn-margin"
						onClick={() => logout()}
					>
						Log Out
					</button>
				)}
			</span>
		</div>
		{isAuthenticated() && (
			<>
				<Query query={GET_MEETINGS}>
					{({ loading, error, data }) => {
						if (loading) return <div>Loading...</div>
						if (error) return <div>Error :(</div>
						console.log(data.meeting)
						return data.meeting.map(meet => <span>{meet.name} - </span>)
					}}
				</Query>
				{props.children}
			</>
		)}
	</>
)

export default hot(module)(App)
