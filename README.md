# E-Commerce Cart Optimizer

A full-stack web application that helps users optimize their shopping cart using advanced algorithms like the Knapsack problem to maximize value while staying within budget and weight constraints.

## 🚀 Features

### Core Functionality
- **Smart Cart Optimization** - Uses Knapsack algorithm to maximize value within budget
- **Multi-Constraint Optimization** - Considers budget, weight, and value simultaneously
- **Real-time Optimization** - Instant cart optimization as you add/remove items
- **User Authentication** - Secure JWT-based authentication system
- **Order Management** - Track and manage purchase history
- **Responsive Design** - Modern UI built with React, TypeScript, and Tailwind CSS

### Technical Features
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Rate limiting, CORS, Helmet.js protection
- **Algorithms**: Dynamic Programming Knapsack + Greedy fallback

## 🏗️ Project Structure

```
E-Commerce Cart Optimizer/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── algorithms/      # Optimization algorithms
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── data/           # Mock data and types
│   │   └── hooks/          # Custom React hooks
│   └── package.json
├── backend/                  # Node.js + Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── server.js
└── README.md
```

## 🛠️ Quick Start

### Option 1: Using Scripts (Recommended)

**Windows:**
```bash
quick-start.bat
```

**Linux/Mac:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp config.env .env
# Edit .env with your MongoDB connection
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

## 🔧 Configuration

### Backend Environment Variables
Create `.env` file in `backend/` directory:

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

## 🧠 Optimization Algorithms

### Knapsack Algorithm
The core optimization uses a dynamic programming approach to solve the 0/1 Knapsack problem:

- **Objective**: Maximize total value while staying within budget and weight limits
- **Constraints**: Budget limit, weight limit, item availability
- **Algorithm**: Space-optimized 2D dynamic programming
- **Fallback**: Greedy algorithm for large datasets

### Key Features
- **Memory Efficient**: Uses rolling arrays to prevent memory overflow
- **Precision Control**: Limits decimal precision to prevent floating-point issues
- **Scalability**: Automatically switches to greedy algorithm for large datasets
- **Multi-Constraint**: Handles budget, weight, and value simultaneously

## 🎯 How It Works

1. **Add Products**: Browse and add items to your cart
2. **Set Constraints**: Define your budget and weight limits
3. **Optimize**: Click optimize to run the Knapsack algorithm
4. **Review**: See the optimized cart with maximum value
5. **Checkout**: Complete your purchase with the optimized selection

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/logout` | Logout user |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update user profile |
| PUT | `/api/user/password` | Change password |

## 🎨 Frontend Features

### Components
- **ProductList**: Browse and add products to cart
- **Cart**: View and optimize shopping cart
- **OptimizationControls**: Set budget and weight constraints
- **OptimizationResults**: Display optimized cart results
- **Orders**: Track purchase history
- **AuthPage**: User authentication interface

### State Management
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state and optimization
- **Toast Notifications**: User feedback system

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute force
- **Input Validation**: Request data validation
- **CORS**: Cross-origin resource sharing
- **Security Headers**: Helmet.js protection

## 🧪 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure MongoDB Atlas
4. Set proper CORS origins

### Security Checklist
- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Configure proper CORS
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Use environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
## 🖼️ Screenshots
<img width="1919" height="862" alt="Screenshot 2025-07-26 161150" src="https://github.com/user-attachments/assets/b4be8507-31a5-4549-9f72-cbf3a93df74d" />
<img width="1917" height="878" alt="Screenshot 2025-07-26 161157" src="https://github.com/user-attachments/assets/e503c635-a5df-4c1b-a3a5-e7ed7dbb3f3c" />
<img width="1919" height="865" alt="Screenshot 2025-07-26 161206" src="https://github.com/user-attachments/assets/0be1613b-92f1-4b74-9bca-6cab4f8b11ad" />
<img width="1919" height="863" alt="Screenshot 2025-07-26 161212" src="https://github.com/user-attachments/assets/aab3fa07-e398-4eba-bc62-46e4d4af95f6" />
<img width="1907" height="720" alt="Screenshot 2025-07-26 161219" src="https://github.com/user-attachments/assets/188bcce5-3341-4649-91c0-b825a98dcb3d" />
<img width="1919" height="868" alt="Screenshot 2025-07-26 161231" src="https://github.com/user-attachments/assets/3e04905f-2f91-4f1d-8c87-93806190571a" />
<img width="1919" height="862" alt="Screenshot 2025-07-26 161237" src="https://github.com/user-attachments/assets/d2a5e8a4-33d8-4d57-9e6f-e48b990b28f3" />
<img width="1919" height="865" alt="Screenshot 2025-07-26 161242" src="https://github.com/user-attachments/assets/e1493f6b-eb73-4dfe-ae58-474ea5b5d3c6" />



## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the application logs
2. Verify MongoDB connection
3. Test API endpoints
4. Check environment variables
5. Review browser console for frontend issues

---

**Built with ❤️ using React, Node.js, and advanced optimization algorithms** 
