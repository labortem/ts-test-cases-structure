#!/usr/bin/env bash
#MISE description="Type-check the type-level test suite (tests pass iff it compiles)"
set -euo pipefail

npx tsc --project tsconfig.test.json
