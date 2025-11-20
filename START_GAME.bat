@echo off
echo ====================================
echo   METROIDVANIA GAME - LAUNCHER
echo ====================================
echo.
echo Starting local web server...
echo.
echo Game will open at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 3...
    start http://localhost:8000/index.html
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2...
    start http://localhost:8000/index.html
    python2 -m SimpleHTTPServer 8000
    goto :end
)

echo ERROR: Python not found!
echo.
echo Please install Python from: https://www.python.org/downloads/
echo Make sure to check "Add Python to PATH" during installation
echo.
pause

:end
