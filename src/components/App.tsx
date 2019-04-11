import React, { FC } from 'react'
import { Global, css } from '@emotion/core'
import { gql } from 'apollo-boost'
import { Query, QueryResult } from 'react-apollo'
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

type ResultData = {
	meeting: {
		id: number
		name: string
	}[]
}

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
		{isAuthenticated() && (
			<>
				<Query query={GET_MEETINGS}>
					{({ loading, error, data }: QueryResult<ResultData>) => {
						if (loading) return <div>Loading...</div>
						if (error || !data) {
							return <div>Error :(</div>
						}
						console.log(data.meeting)
						return data.meeting.map(meet => <span>{meet.name} - </span>)
					}}
				</Query>
				{props.children}
			</>
		)}
	</>
)

export default App
