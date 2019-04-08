import { resolve } from 'path'

const app = resolve(__dirname, '../../')

export default {
	app,
	build: `${app}/build`,
	nodeModules: `${app}/node_modules`,
	publicPath: '/',
}
