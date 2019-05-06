import merge = require('webpack-merge')
import CleanWebpackPlugin from 'clean-webpack-plugin'
import config from 'config'
import common = require('./webpack.common')
import paths from './paths'

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: paths.build,
		hot: true,
		historyApiFallback: true,
		port: config.get('devServerPort'),
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	plugins: [
		new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build'] }),
	],
})
