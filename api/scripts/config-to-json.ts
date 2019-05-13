import { writeFileSync } from 'fs'

process.env['NODE_CONFIG_DIR'] = '../config'

import config = require('config')

writeFileSync('./config.json', JSON.stringify(config))
