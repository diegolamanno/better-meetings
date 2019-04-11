import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import 'normalize.css/normalize.css'

import Routes from './components/Routes'

const client = new ApolloClient({
	uri: 'https://hth5-better-meetings.herokuapp.com/v1alpha1/graphql',
})

const ApolloApp = () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)

const root = document.createElement('div')
document.body.appendChild(root)

render(ApolloApp(), root)
