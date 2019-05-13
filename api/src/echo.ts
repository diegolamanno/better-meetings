import { text } from 'micro'

const app: import('http').RequestListener = async (req, res) => {
	const received = await text(req)
	console.log(received)
	res.end(`Echo: ${received}`)
}

export default app
