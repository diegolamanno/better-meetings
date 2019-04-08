import React from 'react'
import TestRenderer from 'react-test-renderer'
import App from './App'

describe('App', () => {
	it('renders correctly', () => {
		const tree = TestRenderer.create(<App />).toJSON()
		expect(tree).toMatchInlineSnapshot(`
		.emotion-0 {
		  text-align: center;
		}
		
		<h1
		  className="hello-world emotion-0"
		>
		  Hello, 
		  world
		  !
		</h1>
	`)
	})
})
