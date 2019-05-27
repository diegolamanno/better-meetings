import fs from 'fs'
import path from 'path'
import { codegen } from '@graphql-codegen/core'
import { loadSchema } from 'graphql-toolkit'
import { plugin as typescriptPlugin } from '@graphql-codegen/typescript'
import { plugin as typescriptOperationsPlugin } from '@graphql-codegen/typescript-operations'
import { printSchema, parse, GraphQLSchema } from 'graphql'

require('dotenv').config({ path: `${__dirname}/../.env.build` })
const config = require('config')

loadSchema(config.get('hasura.graphqlUri'), {
	headers: {
		'X-Hasura-Admin-Secret': config.get('hasura.adminSecret'),
	},
}).then(async schema => {
	const outputFile = '../src/gql/types.d.ts'
	const config = {
		filename: outputFile,
		schema: parse(printSchema(schema as GraphQLSchema)),
		plugins: [
			{
				typescript: {},
				typescriptOperations: {},
			},
		],
		config: {},
		documents: [],
		pluginMap: {
			typescript: {
				plugin: typescriptPlugin,
			},
			typescriptOperations: {
				plugin: typescriptOperationsPlugin,
			},
		},
	}
	const output = await codegen(config)
	fs.writeFile(path.join(__dirname, outputFile), output, () => {
		console.log('Outputs generated!')
	})
})
