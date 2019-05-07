import { resolve } from 'path'

const app = resolve(__dirname, '../../')

export default {
	app,
	dist: `${app}/dist`,
	nodeModules: `${app}/node_modules`,
	publicPath: '/',
}
