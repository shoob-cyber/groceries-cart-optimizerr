@echo off
echo 🚀 E-Commerce Cart Optimizer - Quick Start
echo ==========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Backend Setup
echo.
echo 🔧 Setting up Backend...
cd backend

REM Install dependencies
echo 📦 Installing backend dependencies...
call npm install

REM Copy environment file
if not exist .env (
    copy config.env .env
    echo ✅ Environment file created
) else (
    echo ✅ Environment file already exists
)

REM Setup database
echo 🗄️  Setting up database...
call npm run setup

REM Start backend in background
echo 🚀 Starting backend server...
start "Backend Server" cmd /k "npm run dev"

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd ..\frontend

REM Install dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Start frontend
echo 🚀 Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend:  https://groceries-cart-optimizerr.onrender.com
echo 🔍 Health:   https://groceries-cart-optimizerr.onrender.com/api/health
echo.
echo 👤 Demo Users:
echo    Email: john@example.com, Password: Password123
echo    Email: admin@example.com, Password: Admin123
echo    Email: demo@example.com, Password: Demo123
echo.
echo 🛑 Close the command windows to stop servers
echo.
pause 