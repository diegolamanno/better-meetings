import React from 'react'
import { render } from 'react-dom'
import { OperationDefinitionNode } from 'graphql'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { from, split } from 'apollo-link'
import ApolloClient from 'apollo-client/ApolloClient'

import 'normalize.css/normalize.css'

import Routes from './components/Routes'

const graphqlUri = 'https://hth5-better-meetings.herokuapp.com/v1alpha1/graphql'

const splitUri = graphqlUri.split('//')
const wsLink = new WebSocketLink({
	uri: `wss://${splitUri[1]}`,
	options: {
		reconnect: true,
		lazy: true,
	},
})

const httpLink = from([
	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
				),
			)
		}
		if (networkError) console.log(`[Network error]: ${networkError}`)
	}),
	new HttpLink({
		uri: graphqlUri,
	}),
])

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(
			query,
		) as OperationDefinitionNode
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

const ApolloApp = () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)

const root = document.createElement('div')
document.body.appendChild(root)

render(ApolloApp(), root)
