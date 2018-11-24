const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: [
			'./js/index.js',
			'./scss/main.scss',
		],
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "js/main.js"
	},
	module: {
		rules: [

			{
				test: /\.js$/, use: [
					{
						loader: "babel-loader",
						options: {"presets": ["@babel/preset-env"]}
					}
				]
			},

			{
				test: /\.(sa|sc|c)ss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{loader: 'css-loader', options: {minimize: true, sourceMap: true}},
						{loader: 'sass-loader', options: {sourceMap: true}},
					]
				})
			},

			{
				test: /\.html$/,
				use: ['html-loader']
			},

			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {name: '[path][name].[ext]'}
					},
					{loader: 'img-loader',}
				]
			},

			{
				test: /\.(woff(2)?|ttf|eot|)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {name: '[path][name].[ext]'}
				}]
			},

			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
			},


		]
	},
	plugins: [
		new ImageminPlugin({test: /\.(jpe?g|png|gif)$/i}),
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: './styles.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
		}),
		new ExtractTextPlugin("./css/styles.css"),
		new HtmlWebpackPlugin({
			template: './index.html',
		})
	],
	devServer: {
		contentBase: __dirname + "/"
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						inline: true,
						drop_console: true
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		]
	},
};