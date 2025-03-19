#!/bin/bash

# Start the process using nohup and save the output to a log file
nohup sudo npm start > output.log 2>&1 &

# Capture the Process ID (PID) and save it to a file
echo $! > process.pid

echo "Process started in the background. PID: $(cat process.pid)"
