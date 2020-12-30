import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
	mode: isProduction ? "production" : "development",
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".json"],
	},
	devtool: "cheap-source-map",
	entry: {
		send: path.resolve(__dirname, "src/send.tsx"),
		receive: path.resolve(__dirname, "src/receive.tsx"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "",
	},
	module: {
		rules: [
			{test: /\.tsx?$/, use: ["ts-loader"]},
			{test: /\.css$/, use: ["style-loader", "css-loader"]},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "send.html",
			chunks: ["send"],
			template: path.resolve(__dirname, "src/template.html"),
		}),
		new HtmlWebpackPlugin({
			filename: "receive.html",
			chunks: ["receive"],
			template: path.resolve(__dirname, "src/template.html"),
		}),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
};

export default config;
