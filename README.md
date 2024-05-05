# TypeScript test cases structure

Repository used as submodules in dependencies to provide typing for test cases suites.

## How to install

-   In the targetted repository, `cd` to the folder to add this repo as a submodule.
-   Execute `git submodule add https://github.com/Labortem/ts_test_cases_structure`
-   Provide authentication is required. The repo should be cloned in the folder.

## How to use it

-   In the test suites, you can import anything you need from the repo. All you need is located in the `src/features`
    folders.
-   You may need to add a TS import path alias to your `tsconfig.json` to improve readability of the imports. In your
    `tsconfig.json`, add a new path alias into the `compilerOptions.paths` array, eg.:
    `"@testCasesStructure" : ["path/to/submodule/src/features"]`.
-   To update the submodule, `cd` into it, then pull the updates with `git pull`. We recommend to only pull `master`
    branch.

## Notes

-   This repo is not intended to be modified when used as submodule. If you want to provide modifications, please clone
    the repo and open pull request as usual.
-   If using VScode, the `NPM scripts` section will detect the submodule scripts. To prevent it, you may add the
    submodule into the `files.exclude` config of the repo `.vscode/settings.json`: `"path/to/submodule": true`
