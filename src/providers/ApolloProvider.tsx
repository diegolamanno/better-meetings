import React, { FC, useContext, ReactNode, useState, useCallback } from 'react'

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

const getApolloLink = (getToken: () => string) => {
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
			Authorization: `Bearer ${getToken()}`,
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
					Authorization: `Bearer ${getToken()}`,
				},
			}),
		},
	})

	return split(
		({ query }) => {
			const { kind, operation } = getMainDefinition(
				query,
			) as import('graphql/language/ast').OperationDefinitionNode
			return kind === 'OperationDefinition' && operation === 'subscription'
		},
		wsLink,
		httpLink,
	)
}

export const ApolloProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const getToken = useCallback(() => authContext.idToken || '', [
		authContext.idToken,
	])

	const [client] = useState(
		new ApolloClient({
			link: getApolloLink(getToken),
			cache: new InMemoryCache(),
		}),
	)

	return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
}

export default ApolloProvider
