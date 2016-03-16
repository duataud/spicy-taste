const path = require('path');
const webpack = require('webpack');

// plugins
const DefinePlugin = webpack.DefinePlugin;
const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',

	module: {
		preLoaders: [{
			test: /\.js$/,
			loaders: ['isparta-instrumenter']
		}],
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader'
		}]
	},

	resolve: {
		root: path.resolve('./src')
	},

	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('test')
		}),
		new NpmInstallPlugin({
			save: true
		})
	]
};
