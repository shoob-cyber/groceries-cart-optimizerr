#!/bin/bash

echo "🚀 E-Commerce Cart Optimizer - Quick Start"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB first."
    echo "   You can use MongoDB Atlas (cloud) as an alternative."
fi

echo "✅ Node.js version: $(node --version)"

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp config.env .env
    echo "✅ Environment file created"
else
    echo "✅ Environment file already exists"
fi

# Setup database
echo "🗄️  Setting up database..."
npm run setup

# Start backend in background
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Start frontend
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:5000"
echo "🔍 Health:   http://localhost:5000/api/health"
echo ""
echo "👤 Demo Users:"
echo "   Email: john@example.com, Password: Password123"
echo "   Email: admin@example.com, Password: Admin123"
echo "   Email: demo@example.com, Password: Demo123"
echo ""
echo "🛑 To stop servers, press Ctrl+C"
echo ""

# Wait for user to stop
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Keep script running
wait 