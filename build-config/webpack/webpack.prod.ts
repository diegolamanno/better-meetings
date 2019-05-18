import TerserJSPlugin = require('terser-webpack-plugin')
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import paths from './paths'
import merge = require('webpack-merge')
import common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	output: {
		pathinfo: true,
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			reportFilename: `${paths.app}/reports/bundle-size.html`,
		}),
	],
})
