#!/bin/bash
# One-shot iOS cycle: setup env -> run Maestro tests -> teardown env.
# Non-interactive; propagates the test exit code (non-zero when any flow fails).
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT" || exit 1

cleanup() {
    echo "Tearing down iOS environment..."
    npm run env:teardown:ios
}
trap cleanup EXIT

echo "Setting up iOS environment..."
npm run env:setup:ios || exit 1

echo "Running Maestro iOS tests..."
npm run maestro:test:wikipedia:ios
STATUS=$?

exit $STATUS
