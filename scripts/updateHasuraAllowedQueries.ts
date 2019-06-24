import { readFileSync } from 'fs'
import fetch from 'node-fetch'
import { parse } from 'graphql'

require('dotenv').config({ path: `${__dirname}/../.env.build` })
const config: typeof import('config') = require('config')

const endpoint: string = config.get('hasura.apiEndpoint')
const collection = config.get('hasura.queryCollectionName')

const makeApiCall = (type: string, args: {}) => fetch(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Role': 'admin',
  },
  method: 'POST',
  body: JSON.stringify({
    type,
    args,
})})

const doUpdate = async () => {
  await makeApiCall('drop_query_collection', {
    collection,
    cascade: true,
  })

  await makeApiCall('create_query_collection', {
    name: collection,
    definition: {
      queries: parse(readFileSync(`${__dirname}/../src/gql/queries.graphql`, { encoding: 'utf-8'})).
    }
  })
}


