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

const graphqlUri = CONFIG.hasura.graphqlUri

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
		) as import('graphql/language/ast').OperationDefinitionNode
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

type ContextType = ApolloClient<NormalizedCacheObject>

export const ApolloContext = createContext<ContextType>({} as ContextType)

const TokenStore: {
	token: string
} = {
	token: '',
}

const ApolloProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const [tokenStore] = useState(TokenStore)
	const [client] = useState(
		new ApolloClient({
			link: setContext((_, { headers }) => {
				return {
					headers: {
						...headers,
						authorization: `Bearer ${tokenStore.token}`,
					},
				}
			}).concat(link),
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
