import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'normalize.css/normalize.css'

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)
