export default async (
	_req: import('http').IncomingMessage,
	res: import('http').ServerResponse,
) => {
	res.end(`Hello, world! This is the index lambda.`)
}
