import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache'
import { WebSocketLink } from 'apollo-link-ws/lib/webSocketLink'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http/lib/httpLink'
import { getMainDefinition } from 'apollo-utilities/lib/getFromAST'
import { from, split } from 'apollo-link/lib/link'
import ApolloClient from 'apollo-client/ApolloClient'

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
		) as import('graphql/language/ast').OperationDefinitionNode
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

export default new ApolloClient({
	link,
	cache: new InMemoryCache(),
})
