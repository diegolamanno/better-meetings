import React, { FC, useContext, ReactNode, useEffect } from 'react'

import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache'
import { WebSocketLink } from 'apollo-link-ws/lib/webSocketLink'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http/lib/httpLink'
import { getMainDefinition } from 'apollo-utilities/lib/getFromAST'
import { from, split } from 'apollo-link/lib/link'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client/ApolloClient'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { AuthContext } from '@providers'

const persistentTokenStore = {
	token: '',
	getToken() {
		return this.token
	},
}

const [, endpoint] = CONFIG.hasura.graphqlUri.split('//')
const httpLinkWithoutAuth = from([
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
		uri: `https://${endpoint}`,
	}),
])

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		Authorization: `Bearer ${persistentTokenStore.getToken()}`,
	},
}))

const httpLink = authLink.concat(httpLinkWithoutAuth)

const wsLink = new WebSocketLink({
	uri: `wss://${endpoint}`,
	options: {
		reconnect: true,
		lazy: true,
		connectionParams: () => ({
			headers: {
				Authorization: `Bearer ${persistentTokenStore.getToken()}`,
			},
		}),
	},
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(
			query,
		) as import('graphql/language/ast').OperationDefinitionNode
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

export const ApolloProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)

	useEffect(() => {
		if (authContext.idToken) {
			persistentTokenStore.token = authContext.idToken
		}

		return () => {
			persistentTokenStore.token = ''
		}
	}, [authContext.idToken])

	return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
}

export default ApolloProvider
