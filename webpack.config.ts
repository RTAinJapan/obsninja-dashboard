import path from "path";
import fs from "fs";
import webpack, {Entry} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const pages = fs.readdirSync(path.resolve(__dirname, "src/views"));
const entry: Entry = {};
for (const page of pages) {
	entry[page] = path.resolve(__dirname, "src/views", page);
}

const config: webpack.Configuration = {
	mode: isProduction ? "production" : "development",
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".json"],
	},
	devtool: "cheap-source-map",
	entry,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: path.resolve(__dirname, "tsconfig.webpack.json"),
						},
					},
				],
			},
			{test: /\.css$/, use: ["style-loader", "css-loader"]},
		],
	},
	plugins: [
		...pages.map(
			(page) =>
				new HtmlWebpackPlugin({
					filename: page.replace(/\.tsx?$/, ".html"),
					chunks: [page],
					template: path.resolve(__dirname, "src/template.html"),
				}),
		),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendors: false,
				common: {
					minChunks: 2,
				},
			},
		},
	},
};

export default config;
