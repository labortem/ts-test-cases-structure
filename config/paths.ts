import { resolve } from "path";

export const root = process.cwd();

export const inAppFolder = resolve(root, "src");
export const entryFile = resolve(inAppFolder, "main.ts");

export const outFolder = resolve(root, "build");
export const outAppFile = resolve(outFolder, "app.js");
export const outTypesFile = resolve(outFolder, "app.d.ts");

export const tsconfig = resolve(root, "tsconfig.json");
