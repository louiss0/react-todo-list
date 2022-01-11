/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path")
const config = require("./webpack.config")
const { default: merge } = require("webpack-merge")
const ForkTsWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(config, {
	devtool: "eval",
	target: "web",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].bundle.js",
		clean: true,
	},
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000,
		ignored: "**/node_modules",
	},
	devServer: {
		compress: true,
		client: {
			logging: "info",
			overlay: true,
		},
		webSocketServer: "ws",
		host: "0.0.0.0",
		port: 3000,
	},
	plugins: [
		new ForkTsWebpackPlugin({
			eslint: {
				files: "./src/**/*.{ts,tsx,js,jsx}",
				options: {
					fix: true,
				},
			},
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "src", to: "public" }],
		}),
	],
})
