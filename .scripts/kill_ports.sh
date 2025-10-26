#!/bin/bash

# Array of ports to free up
PORTS=(5037 5554 5555 5556 5557 5558 5559 5560 5561 5584 5585 9999)  # ADB and emulator ports

for PORT in "${PORTS[@]}"; do
  PIDS=$(lsof -t -i:$PORT)
  if [ -n "$PIDS" ]; then
    echo "Killing processes on port $PORT: $PIDS"
    kill -9 $PIDS
  else
    echo "No process found using port $PORT"
  fi
done

