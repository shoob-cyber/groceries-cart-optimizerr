# 🚀 E-Commerce Cart Optimizer - Complete Setup Guide

This guide will help you set up the complete E-Commerce Cart Optimizer project with real backend authentication.

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

## 🛠️ Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the config file
cp config.env .env

# Edit .env with your settings
```

**Required Environment Variables:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-cart-optimizer

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Setup Database

```bash
# Run the setup script to create demo users
npm run setup
```

This will create demo users:
- **john@example.com** / **Password123** (user)
- **admin@example.com** / **Admin123** (admin)
- **demo@example.com** / **Demo123** (user)

### 5. Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

**Expected Output:**
```
✅ Connected to MongoDB
🚀 Server running on port 5000
📱 API available at http://localhost:5000/api
🔍 Health check: http://localhost:5000/api/health
```

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🔐 Authentication Testing

### 1. Test Backend API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### 2. Test Frontend

1. Open [http://localhost:5173](http://localhost:5173)
2. Try logging in with demo credentials:
   - Email: `john@example.com`
   - Password: `Password123`
3. Test registration with a new account
4. Verify that authentication persists on page refresh

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

**JWT Secret Issues:**
```bash
# Generate a new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend Issues

**CORS Errors:**
- Ensure backend CORS_ORIGIN matches frontend URL
- Check that backend is running on port 5000

**API Connection Errors:**
- Verify backend server is running
- Check API_BASE_URL in AuthContext.tsx
- Ensure no firewall blocking localhost

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET=<strong-secret-key>
   MONGODB_URI=<production-mongodb-uri>
   CORS_ORIGIN=<your-frontend-domain>
   ```

2. **Security Checklist:**
   - [ ] Use HTTPS
   - [ ] Strong JWT secret
   - [ ] Proper CORS configuration
   - [ ] Rate limiting enabled
   - [ ] Security headers enabled

### Frontend Deployment

1. **Build for Production:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Update API URL:**
   - Change `API_BASE_URL` in `AuthContext.tsx`
   - Use production backend URL

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/validate` | Validate JWT token |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### User Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |
| PUT | `/api/user/password` | Change password |
| DELETE | `/api/user/profile` | Delete account |

## 🔍 Monitoring & Debugging

### Backend Logs
```bash
# View real-time logs
npm run dev

# Check MongoDB connection
mongo ecommerce-cart-optimizer
```

### Frontend Debugging
- Open browser DevTools
- Check Network tab for API calls
- Check Console for errors
- Verify localStorage for tokens

## 📞 Support

If you encounter issues:

1. **Check the logs** - Both backend and frontend console
2. **Verify MongoDB** - Ensure database is running
3. **Test API endpoints** - Use curl or Postman
4. **Check environment variables** - Verify all required vars are set
5. **Restart services** - Sometimes a fresh start helps

## 🎉 Success Indicators

✅ **Backend Running:**
- MongoDB connected
- Server on port 5000
- Health check returns 200

✅ **Frontend Running:**
- Vite dev server on port 5173
- No console errors
- Login page loads

✅ **Authentication Working:**
- Can register new users
- Can login with credentials
- JWT tokens are generated
- Protected routes work
- Logout clears session

---

**🎯 You're all set!** The E-Commerce Cart Optimizer now has a complete, secure authentication system with a real backend API. 