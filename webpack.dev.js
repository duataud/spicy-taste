const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

// plugins
const DefinePlugin = webpack.DefinePlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NoErrorsPlugin = webpack.NoErrorsPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
	cache: true,
	debug: true,
	devtool: 'source-map',

	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:5050',
			'webpack/hot/dev-server',
			'./src/index.js'
		],
		vendor: [
			'babel-polyfill',
			'classnames',
			'firebase',
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-thunk'
		]
	},

	output: {
		filename: '[name].js',
		path: path.resolve('./target'),
		publicPath: '/'
	},

	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules'],
		root: path.resolve('./src')
	},

	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader',
			include: path.join(__dirname, 'src')
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				plugins: [
					['react-transform', {
						transforms: [{
							transform: 'react-transform-hmr',
							imports: ['react'],
							locals: ['module']
						}]
					}]
				]
			}
		}]
	},

	postcss: [
		autoprefixer({
			browsers: ['last 3 versions']
		})
	],

	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new OccurenceOrderPlugin(),
		new CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HotModuleReplacementPlugin(),
		new NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			chunksSortMode: 'none',
			filename: 'index.html',
			inject: 'body',
			hash: true,
			template: './src/index.html'
		}),
		new NpmInstallPlugin({
			save: true
		})
	],

	devServer: {
		contentBase: './src',
		historyApiFallback: true,
		hot: true,
		progress: true,
		port: 5050,
		publicPath: '/',
		stats: {
			cached: true,
			cachedAssets: true,
			chunks: true,
			chunkModules: false,
			colors: true,
			hash: false,
			reasons: true,
			timings: true,
			version: false
		}
	}
};
