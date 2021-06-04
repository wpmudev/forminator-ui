const webpack = require('webpack');
const path = require('path');

module.exports = {
	stories: [
		'../packages/**/*.stories.mdx',
		'../packages/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials'
	],
	webpackFinal: async ( config ) => {

		config.module.rules.push({
			test: /\.(sass|scss)$/,
			use: ['resolve-url-loader'],
			include: path.resolve( __dirname, '../' )
		});

		config.module.rules.push({
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			use: [{
				loader: 'file-loader',
				query: {
					name: '[name].[ext]'
				}
			}],
			include: path.resolve( __dirname, '../' )
		});

		config.plugins.push(
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		);

		return config;

	}
};