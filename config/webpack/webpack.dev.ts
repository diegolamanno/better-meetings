import merge = require('webpack-merge')
import CleanWebpackPlugin from 'clean-webpack-plugin'

import common = require('./webpack.common')
import paths from './paths'

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: paths.build,
		hot: true,
		historyApiFallback: true,
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
