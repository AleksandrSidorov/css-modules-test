var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'static/js/bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: "[name]__[local]--[hash:base64:5]",
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: function() {
								return [
									require('autoprefixer')({
										browsers: [
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9'
										]
									})
								]
							}
						}
				  }
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react"]
				}
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			inject: true
		})
	]
}