/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const config = require("./webpack.config");
const { default: merge } = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
	devtool: "source-map",
	target: "browserslist",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].[contenthash].js",
		clean: true
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					ecma: 5,
					ie8: true,
					safari10: true,
					keep_fnames: true,
					keep_classnames: true,
					module: true,
					toplevel: true
				}
			}),
			new CssMinimizerWebpackPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.(?:s?css)$/i,
				use: [
					MiniCssWebpackPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true
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
			}
		]
	},
	plugins: [ new MiniCssWebpackPlugin() ]
});
