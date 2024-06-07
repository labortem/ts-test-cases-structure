import { Configuration } from "webpack";

import * as paths from "../paths";

import { basename } from "path";

module.exports = <Configuration>{
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
				exclude: [
					paths.configFolder,
				],
				options: {
					compilerOptions: {
						declaration: true,
						declarationDir: paths.outTypesFolder,
						allowUnreachableCode: false,
						allowUnusedLabels: false,
					},
					onlyCompileBundledFiles: true,
				},
			},
		],
	},
	resolve: {
		extensions: [
			".ts",
		],
	},
};
