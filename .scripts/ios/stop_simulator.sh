#!/bin/bash
# Shuts down all iOS simulators and closes the Simulator app.
# Always exits 0 so teardown chains don't break when nothing is running.

xcrun simctl shutdown all 2>/dev/null || true
killall Simulator 2>/dev/null || true

echo "iOS simulators stopped."
exit 0
