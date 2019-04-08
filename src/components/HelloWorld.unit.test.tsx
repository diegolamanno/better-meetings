import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import HelloWorld from './HelloWorld'

describe('App', () => {
	it('renders correctly', () => {
		const tree = TestRenderer.create(<HelloWorld />).toJSON()
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

	it('Renders with the passed name', () => {
		const name = 'Thundertron'
		const wrapper = shallow(<HelloWorld name={name} />)
		expect(wrapper.text()).toEqual(`Hello, ${name}!`)
	})
})
