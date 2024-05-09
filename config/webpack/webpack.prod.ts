import { Configuration } from "webpack";

import * as paths from "../paths";
import { basename } from "path";

export default <Configuration>{
	entry: paths.entryFile,
	output: {
		path: paths.outFolder,
		filename: basename(paths.outAppFile),
		clean: true,
	},
	mode: "production",
	optimization: {
		minimize: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
			},
		],
	},
	resolve: {
		extensions: [
			".ts",
		],
	},
	plugins: [],
};
