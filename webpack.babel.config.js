const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/index')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader?cacheDirectory',
			exclude: path.resolve(__dirname, 'node_modules')
		}]
	},
	resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
	devServer: {
		contentBase: './dist',
		hot: true,
		inline: true,
		port: 8888
	},
	mode: 'development',
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, './'),
			verbose: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			title: 'Development',
			template: 'index.html'
		})
	]
};
