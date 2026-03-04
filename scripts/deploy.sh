#!/bin/bash
# Deployment script for Sentient Agent Hub
set -e
npm install
npm run build || echo "No build step defined."
echo "Starting server..."
npm start
