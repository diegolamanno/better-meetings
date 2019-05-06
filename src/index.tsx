import React from 'react'
import { render } from 'react-dom'
import ApolloProvider from 'react-apollo/ApolloProvider'
import firebase from 'firebase'
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

firebase.initializeApp(CONFIG.firebase)

const functions = firebase.functions()
if (process.env.NODE_ENV === 'development') {
	functions.useFunctionsEmulator(CONFIG.firebase.devUrl)
}

const helloWorld = functions.httpsCallable('helloWorld')
helloWorld('foobarbaz')
	.then(result => console.log(result))
	.catch(error => console.error(error))
