#!/bin/bash

echo "💣 Killing all automation frameworks-related processes"

MASKS=("maestro" "qemu-system" "emulator" "adb" "Android Emulator" "AndroidStudio" "studio")

for MASK in "${MASKS[@]}"; do
  PIDS=$(pgrep -f "$MASK")
  if [ -n "$PIDS" ]; then
    for PID in $PIDS; do
      echo "❌ Killing PID $PID (matched by '$MASK')"
      kill -9 $PID 2>/dev/null
    done
  fi
done

echo "✅ All matching automation frameworks processes killed."
