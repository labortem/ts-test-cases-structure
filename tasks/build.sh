#!/usr/bin/env bash
#MISE description="Build the type declarations with tsc"
set -euo pipefail

npx tsc -p tsconfig.build.json
npx tsc-alias -p tsconfig.build.json
