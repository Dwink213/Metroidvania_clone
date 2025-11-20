#!/bin/bash

echo "===================================="
echo "  METROIDVANIA GAME - LAUNCHER"
echo "===================================="
echo ""
echo "Starting local web server..."
echo ""
echo "Game will open at: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check for Python 3
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    # Try to open browser (platform-specific)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8000/index.html &
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8000/index.html &
    fi
    python3 -m http.server 8000
    exit 0
fi

# Check for Python 2
if command -v python &> /dev/null; then
    echo "Using Python..."
    # Try to open browser (platform-specific)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000/index.html &
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000/index.html &
    fi
    python -m SimpleHTTPServer 8000
    exit 0
fi

echo "ERROR: Python not found!"
echo ""
echo "Please install Python:"
echo "  macOS: brew install python3"
echo "  Linux: sudo apt install python3  (or equivalent for your distro)"
echo ""
echo "Or download from: https://www.python.org/downloads/"
