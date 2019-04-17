import React from 'react'
import { render } from 'react-dom'
import ApolloProvider from 'react-apollo/ApolloProvider'
import Routes from './components/Routes'
import Client from './client'
import 'normalize.css/normalize.css'

const ApolloApp = () => (
	<ApolloProvider client={Client}>
		<Routes />
	</ApolloProvider>
)

const root = document.createElement('div')
document.body.appendChild(root)

render(ApolloApp(), root)
