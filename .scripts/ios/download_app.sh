#!/bin/bash
# Ensures the Wikipedia iOS simulator build is present and unpacked.
# Source of truth: apps/ios/wikipedia/wikipedia.zip (tracked in Git LFS).
# Fallback: download from Maestro's official samples bucket.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

APP_DIR="$PROJECT_ROOT/apps/ios/wikipedia"
ZIP_PATH="$APP_DIR/wikipedia.zip"
APP_PATH="$APP_DIR/Wikipedia.app"
DOWNLOAD_URL="https://storage.googleapis.com/mobile.dev/samples/wikipedia.zip"

mkdir -p "$APP_DIR"

# Detect a Git LFS pointer file (repo cloned without `git lfs pull`)
if [ -f "$ZIP_PATH" ] && head -c 200 "$ZIP_PATH" | grep -q "git-lfs"; then
    echo "wikipedia.zip is a Git LFS pointer, not the real archive. Re-downloading..."
    rm -f "$ZIP_PATH"
fi

if [ ! -f "$ZIP_PATH" ]; then
    echo "Downloading Wikipedia iOS app from $DOWNLOAD_URL ..."
    curl -fSL --retry 3 -o "$ZIP_PATH" "$DOWNLOAD_URL"
fi

if [ ! -d "$APP_PATH" ]; then
    echo "Unpacking Wikipedia.app ..."
    unzip -oq "$ZIP_PATH" -d "$APP_DIR" -x '__MACOSX/*'
fi

if [ ! -d "$APP_PATH" ]; then
    echo "Error: Wikipedia.app not found after unpacking $ZIP_PATH"
    exit 1
fi

echo "Wikipedia.app ready at $APP_PATH"
