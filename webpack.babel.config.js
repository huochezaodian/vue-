const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/babel/main')
	},
	output: {
		path: path.resolve(__dirname, 'src/js/main')
	},
	module: {
		rules: [{
			test:/\.js$/,
			loader: 'babel-loader?cacheDirectory',
			exclude: path.resolve(__dirname, 'node_modules')
		}]
	},
	resolve: {
        extensions: [],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    plugins:[

    ],
    devtool: '#source-map'
}