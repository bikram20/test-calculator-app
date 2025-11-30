#!/bin/bash
set -e

echo "==================================="
echo "Vite/React - Resilient Dev Mode"
echo "==================================="
echo ""

cd /workspaces/app

# --- 1. Ensure we have the right tools ---
# We use nodemon to manage the restart lifecycle. 
# Installing it globally in the container ensures it's available without polluting package.json
if ! command -v nodemon &> /dev/null; then
    echo "📦 Installing process manager (nodemon)..."
    npm install -g nodemon
fi

# --- 2. Define the execution logic ---
# This command runs EVERY time nodemon triggers (start or restart).
# It ensures dependencies are always in sync before the server creates its locks.
START_CMD="npm install && npm run dev"

echo ""
echo "🚀 Starting Supervisor..."
echo "   - Watching: package.json"
echo "   - Action: Stop Server -> npm install -> Start Server"
echo ""

# --- 3. Run the Supervisor ---
# --watch package.json: Only look at this file
# --ext json: Only react to json changes
# --exec: The command to run. Nodemon handles the SIGTERM to Vite automatically.
nodemon \
  --watch package.json \
  --ext json \
  --exec "$START_CMD"