#!/bin/bash
# Factory-resets the target simulator so subsequent runs start from a clean device.
# Override the device with: IOS_SIMULATOR_NAME="iPhone 16" npm run ios:erase:simulator
set -euo pipefail

SIMULATOR_NAME="${IOS_SIMULATOR_NAME:-iPhone 16 Pro}"

UDID=$(xcrun simctl list devices available | grep "$SIMULATOR_NAME (" | grep -E -o -i "([0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12})" | head -1)

if [ -z "$UDID" ]; then
    echo "No simulator named '$SIMULATOR_NAME' found — nothing to erase."
    exit 0
fi

xcrun simctl shutdown "$UDID" 2>/dev/null || true
xcrun simctl erase "$UDID"

echo "$SIMULATOR_NAME ($UDID) erased to factory state."
