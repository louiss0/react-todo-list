/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const EsLintWebpackPlugin = require("eslint-webpack-plugin");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");
const webpack = require("webpack");

const filesToResolve = [ ".ts", ".tsx", ".js" ];

module.exports = {
	entry: "./src/index.tsx",
	resolve: {
		extensions: filesToResolve
	},
	module: {
		rules: [
			{
				test: /\.(?:s?css)$/i,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [ "postcss-preset-env" ]
							}
						}
					}
				]
			},

			{
				test: /\.(?:m?js)$/i,
				loader: "babel-loader",
				exclude: /(node_modules|bower_components)/,
				options: {
					presets: [ "@babel/preset-env" ]
				}
			},
			{
				test: /.(tsx?)$/i,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
							happyPackMode: true
						}
					}
				]
			},
			{
				test: /\.(ico|png|jpe?g|gif|tiff)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[hash][ext][query]"
				}
			},

			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
				type: "asset/inline",
				generator: {
					filename: "vector-graphics/[hash][ext][query]"
				}
			}
		]
	},
	optimization: {
		moduleIds: "deterministic",
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			script: "defer",
			favicon: "./src/assets/favicon.ico"
		}),
		new EsLintWebpackPlugin({
			extensions: filesToResolve
		}),
		new WindiCSSWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env)
		})
	],
	stats: "errors-only"
};
