#!/bin/bash

# Check if the PID file exists
if [ -f process.pid ]; then
    # Read the PID from the file
    PID=$(cat process.pid)

    # Attempt to gracefully terminate the process
    kill $PID

    echo "Sent SIGTERM to process with PID: $PID"

    # Remove the PID file
    rm -f process.pid
else
    echo "No process.pid file found. Process might not be running."
fi
