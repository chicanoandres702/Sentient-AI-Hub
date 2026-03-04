#!/bin/bash
# Unified launch script for backend and frontend

# Start backend
node server/app.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
cd ui-extension
npm install
npm start

# Kill backend when frontend stops
kill $BACKEND_PID
