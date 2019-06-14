import HtmlWebpackPlugin = require('html-webpack-plugin')
import { DefinePlugin } from 'webpack'
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import { GenerateSW } from 'workbox-webpack-plugin'
import { createEmotionPlugin } from 'emotion-ts-plugin'
import paths from './paths'

module.exports = {
	context: paths.app,
	entry: {
		app: './src/index.tsx',
	},
	output: {
		path: paths.dist,
		publicPath: paths.publicPath,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [
							createEmotionPlugin({
								sourcemap: true,
								autoLabel: true,
								autoInject: false,
							}),
						],
					}),
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new GenerateSW({
			clientsClaim: true,
			exclude: [/\.map$/, /asset-manifest\.json$/],
			importWorkboxFrom: 'cdn',
			navigateFallback: `${paths.publicPath}index.html`,
			navigateFallbackBlacklist: [
				// Exclude URLs starting with /_, as they're likely an API call
				new RegExp('^/_'),
				// Exclude URLs containing a dot, as they're likely a resource in
				// public/ and not a SPA route
				new RegExp('/[^/]+\\.[^/]+$'),
			],
		}),
		new HtmlWebpackPlugin({
			title: 'Better Meetings',
			meta: {
				viewport: 'width=device-width, initial-scale=1.0',
				'X-UA-Compatible': {
					'http-equiv': 'X-UA-Compatible',
					content: 'ie=edge',
				},
			},
			favicon: 'src/images/favicon.png',
		}),
		new DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
	],
}
