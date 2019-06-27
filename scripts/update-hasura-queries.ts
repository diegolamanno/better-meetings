import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import { parse, print, OperationDefinitionNode } from 'graphql'

require('dotenv').config({ path: `${__dirname}/../.env.build` })
const config: typeof import('config') = require('config')

const endpoint: string = config.get('hasura.apiEndpoint')
const collection = 'allowed-queries'

const makeApiCall = (type: string, args: {}) =>
	fetch(endpoint, {
		headers: {
			'Content-Type': 'application/json',
			'X-Hasura-Role': 'admin',
			'X-Hasura-Admin-Secret': config.get('hasura.adminSecret'),
		},
		method: 'POST',
		body: JSON.stringify({
			type,
			args,
		}),
	})

const doUpdate = async () => {
	await makeApiCall('drop_collection_from_allowlist', {
		collection,
	})

	await makeApiCall('drop_query_collection', {
		collection,
		cascade: true,
	})

	const parsed = parse(
		readFileSync(`${__dirname}/../src/gql/queries.graphql`, {
			encoding: 'utf-8',
		}),
	)
	if (!parsed.loc) {
		throw new Error('Unable to parse queries file!')
	}

	const queries = parsed.definitions.map(definition => {
		const { name } = definition as OperationDefinitionNode
		if (!name) {
			throw new Error('Encountered anonymous query in query file!')
		}

		return {
			query: print(definition),
			name: name.value,
		}
	})

	await makeApiCall('create_query_collection', {
		name: collection,
		definition: {
			queries,
		},
	})

	await makeApiCall('add_collection_to_allowlist', {
		collection,
	})

	console.log('Successfully updated allowed queries on Hasura')
}

doUpdate()
