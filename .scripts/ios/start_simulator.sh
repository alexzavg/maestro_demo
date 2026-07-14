#!/bin/bash
# Boots the target iOS simulator and waits until it is fully ready.
# Override the device with: IOS_SIMULATOR_NAME="iPhone 16" npm run maestro:device:start:ios
set -euo pipefail

SIMULATOR_NAME="${IOS_SIMULATOR_NAME:-iPhone 16 Pro}"

UDID=$(xcrun simctl list devices available | grep "$SIMULATOR_NAME (" | grep -E -o -i "([0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12})" | head -1)

if [ -z "$UDID" ]; then
    echo "Error: no available simulator named '$SIMULATOR_NAME'. Available devices:"
    xcrun simctl list devices available
    exit 1
fi

echo "Booting $SIMULATOR_NAME ($UDID) ..."
xcrun simctl boot "$UDID" 2>/dev/null || true # already booted is fine

open -a Simulator --args -CurrentDeviceUDID "$UDID"

echo "Waiting for simulator to finish booting..."
xcrun simctl bootstatus "$UDID" -b

echo "$SIMULATOR_NAME is booted and ready."
