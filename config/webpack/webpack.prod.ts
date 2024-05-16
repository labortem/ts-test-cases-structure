import { Configuration } from "webpack";

import * as paths from "../paths";

import { basename } from "path";

module.exports = (env: any, argv: any) => {
	const isProduction = argv?.mode === "production" ?? false;

	return <Configuration>{
		entry: paths.entryFile,
		output: {
			path: paths.outFolder,
			filename: basename(paths.outAppFile),
			clean: true,
		},
		mode: isProduction ? "production" : "development",
		devtool: isProduction ? false : "inline-source-map",
		optimization: {
			minimize: isProduction,
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
};
