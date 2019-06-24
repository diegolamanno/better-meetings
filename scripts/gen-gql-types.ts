import fs from 'fs'
import path from 'path'
import { codegen } from '@graphql-codegen/core'
import { loadSchema } from 'graphql-toolkit'
import { plugin as typescriptPlugin } from '@graphql-codegen/typescript'
import { plugin as typescriptOperationsPlugin } from '@graphql-codegen/typescript-operations'
import { plugin as typescriptGraphqlFilesModulesPlugin } from '@graphql-codegen/typescript-graphql-files-modules'
import { Types } from '@graphql-codegen/plugin-helpers'
import { printSchema, parse, GraphQLSchema } from 'graphql'

require('dotenv').config({ path: `${__dirname}/../.env.build` })
const config = require('config')

loadSchema(config.get('hasura.graphqlUri'), {
	headers: {
		'X-Hasura-Admin-Secret': config.get('hasura.adminSecret'),
	},
}).then(async schema => {
	const schemaOutputFile = '../src/gql/types.d.ts'
	const queriesPathBase = `../src/gql/queries`
	const queriesInputFile = `${__dirname}/${queriesPathBase}.graphql`
	const queriesOutputFile = `${queriesPathBase}.d.ts`
	const parsedSchema = parse(printSchema(schema as GraphQLSchema))
	const baseConfig = {
		schema: parsedSchema,
		config: {},
		documents: [
			{
				filePath: queriesInputFile,
				content: parse(
					fs.readFileSync(queriesInputFile, { encoding: 'utf-8' }),
				),
			},
		],
		pluginMap: {
			typescript: {
				plugin: typescriptPlugin,
			},
			typescriptOperations: {
				plugin: typescriptOperationsPlugin,
			},
			typescriptGraphqlFilesModules: {
				plugin: typescriptGraphqlFilesModulesPlugin,
			},
		},
	}
	const schemaConfig: Types.GenerateOptions = {
		...baseConfig,
		filename: schemaOutputFile,
		plugins: [
			{
				typescript: {},
			},
			{
				typescriptOperations: {},
			},
		],
	}
	const schemaOutput = await codegen(schemaConfig)

	const queriesConfig: Types.GenerateOptions = {
		...baseConfig,
		filename: queriesOutputFile,
		plugins: [
			{
				typescriptGraphqlFilesModules: {},
			},
		],
	}
	const queriesOutput = await codegen(queriesConfig)

	fs.writeFile(path.join(__dirname, schemaOutputFile), schemaOutput, () => {
		console.log('Schema types generated!')
	})

	fs.writeFile(path.join(__dirname, queriesOutputFile), queriesOutput, () => {
		console.log('Query types generated!')
	})
})
