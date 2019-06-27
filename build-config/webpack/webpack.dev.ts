import merge = require('webpack-merge')
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import config from 'config'
import common = require('./webpack.common')
import paths from './paths'

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: paths.dist,
		hot: true,
		historyApiFallback: true,
		port: config.get('devServerPort'),
		proxy: {
			[`${config.get('api.baseURL')}`]: 'http://localhost:3000',
		},
	},
	plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] })],
})
