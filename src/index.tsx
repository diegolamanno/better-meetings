import React from 'react'
import { render } from 'react-dom'
import ApolloProvider from 'react-apollo/ApolloProvider'
import Pusher from 'pusher-js'
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

const pusher = new Pusher(CONFIG.pusher.appKey, {
	cluster: CONFIG.pusher.cluster,
	forceTLS: true,
	disableStats: true,
})

pusher.subscribe('my-channel')
