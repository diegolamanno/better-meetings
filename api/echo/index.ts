import { text } from 'micro'

export default async (
	req: import('http').IncomingMessage,
	res: import('http').ServerResponse,
) => {
	const received = await text(req)
	res.end(`Echo: ${received}`)
}
