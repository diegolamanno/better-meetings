import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import App from './components/App'
import 'normalize.css/normalize.css'

const client = new ApolloClient({
	uri: 'https://hth5-better-meetings.herokuapp.com/v1alpha1/graphql',
})

const ApolloApp = AppComponent => (
	<ApolloProvider client={client}>
		<AppComponent />
	</ApolloProvider>
)

const root = document.createElement('div')
document.body.appendChild(root)

render(ApolloApp(App), root)
