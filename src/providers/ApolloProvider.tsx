import React, {
	FC,
	useContext,
	ReactNode,
	createContext,
	useState,
	useEffect,
} from 'react'

import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache'
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types'
import { WebSocketLink } from 'apollo-link-ws/lib/webSocketLink'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http/lib/httpLink'
import { getMainDefinition } from 'apollo-utilities/lib/getFromAST'
import { from, split } from 'apollo-link/lib/link'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client/ApolloClient'
import ReactApolloProvider from 'react-apollo/ApolloProvider'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { AuthContext } from '../providers/AuthProvider'

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

type TokenStore = {
	token: string
	getToken: () => TokenStore['token']
}

const tokenStore: TokenStore = {
	token: '',
	getToken(this: typeof tokenStore) {
		return this.token
	},
}

type ContextType = ApolloClient<NormalizedCacheObject>

export const ApolloContext = createContext<ContextType>({} as ContextType)

const ApolloProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const [client] = useState(
		new ApolloClient({
			link: getApolloLink(() => tokenStore.getToken()),
			cache: new InMemoryCache(),
		}),
	)

	useEffect(() => {
		if (authContext.idToken) {
			tokenStore.token = authContext.idToken
		}
	}, [authContext.idToken])

	return (
		<ReactApolloProvider client={client}>
			<ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
		</ReactApolloProvider>
	)
}

export default ApolloProvider
