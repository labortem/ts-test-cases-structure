#!/usr/bin/env bash
#MISE description="Format the whole project with Prettier"
set -euo pipefail

npx prettier --write .
