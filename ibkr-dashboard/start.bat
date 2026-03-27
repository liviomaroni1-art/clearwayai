@echo off
echo ========================================
echo  IBKR Portfolio Dashboard - Setup
echo ========================================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH.
    echo Download from https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [OK] Python found

REM Install dependencies
echo.
echo Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
)
echo [OK] Dependencies installed

REM Check .env file
if not exist .env (
    echo.
    echo Creating .env file...
    (
        echo IBKR_HOST=127.0.0.1
        echo IBKR_PORT=4001
        echo IBKR_CLIENT_ID=1
        echo IBKR_ACCOUNT_ID=U23250336
        echo ANTHROPIC_API_KEY=YOUR_KEY_HERE
    ) > .env
    echo [!] .env file created. Please edit it and add your Anthropic API key.
    echo     Open .env in a text editor and replace YOUR_KEY_HERE
    pause
    exit /b 0
) else (
    echo [OK] .env file exists
)

echo.
echo ========================================
echo  Starting Dashboard...
echo ========================================
echo.
echo Make sure TWS or IB Gateway is running with API enabled!
echo  - TWS: Edit ^> Global Configuration ^> API ^> Settings
echo    Check "Enable ActiveX and Socket Clients", port 7497
echo  - IB Gateway: Configure ^> Settings ^> API, port 4001
echo.
echo Dashboard will be at: http://localhost:8080
echo Press Ctrl+C to stop.
echo.
python app.py
pause
