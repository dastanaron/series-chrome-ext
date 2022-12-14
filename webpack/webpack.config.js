const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
	mode: "production",
	devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : false,
	entry: {
		background: path.resolve(__dirname, "..", "src", "background.ts"),
		popup: path.resolve(__dirname, "..", "src", "popup.ts"),
		search: path.resolve(__dirname, "..", "src", "search.ts"),
	},
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{from: ".", to: ".", context: "public"}]
		}),
	],
};
