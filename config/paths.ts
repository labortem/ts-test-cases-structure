import { resolve } from "path";

export const root = process.cwd();

export const srcFolder = resolve(root, "src");
export const entryFile = resolve(srcFolder, "main.ts");

export const outFolder = resolve(root, "build");
export const outAppFile = resolve(outFolder, "app.js");
export const outTypesFolder = resolve(outFolder, "types");

export const configFolder = resolve(root, "config");

export const tsconfig = resolve(root, "tsconfig.json");
