import React, { FC } from 'react'
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

const auth = new Auth()
auth.login()

const App: FC<RouteComponentProps> = () => (
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

		<Query query={GET_MEETINGS}>
			{({ loading, error, data }) => {
				if (loading) return <div>Loading...</div>
				if (error) return <div>Error :(</div>
				console.log(data.meeting)
				return data.meeting.map(meet => <span>{meet.name} - </span>)
			}}
		</Query>
	</>
)

export default hot(module)(App)
