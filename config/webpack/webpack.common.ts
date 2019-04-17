import HtmlWebpackPlugin = require('html-webpack-plugin')
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import dotenv, { DotenvParseOutput } from 'dotenv'
import { GenerateSW } from 'workbox-webpack-plugin'
import { createEmotionPlugin } from 'emotion-ts-plugin'
import paths from './paths'
import webpack = require('webpack')

const env = dotenv.config().parsed as DotenvParseOutput

type PrevKey = {
	[key: string]: string
}

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev: PrevKey, next: string) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next])
	return prev
}, {})

module.exports = {
	context: paths.app,
	entry: {
		app: './src/index.tsx',
	},
	output: {
		path: paths.build,
		publicPath: paths.publicPath,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [createEmotionPlugin()],
					}),
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
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
			title: 'Good Time',
			meta: {
				viewport: 'width=device-width, initial-scale=1.0',
				'X-UA-Compatible': {
					'http-equiv': 'X-UA-Compatible',
					content: 'ie=edge',
				},
			},
		}),
		new webpack.DefinePlugin(envKeys),
	],
}
