# E-Commerce Cart Optimizer Backend

A secure Express.js backend with MongoDB for the E-Commerce Cart Optimizer application.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **User Management** - Registration, login, profile management
- **Password Security** - bcrypt hashing with salt rounds
- **Input Validation** - Express-validator for request validation
- **Rate Limiting** - Protection against brute force attacks
- **CORS Support** - Cross-origin resource sharing
- **Security Headers** - Helmet.js for security
- **Error Handling** - Comprehensive error management
- **Admin Routes** - User management for administrators

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the config file
   cp config.env .env
   
   # Edit the .env file with your configuration
   ```

3. **Start MongoDB:**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

4. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Configuration

Edit `config.env` with your settings:

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

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/validate` | Validate JWT token | Public |
| GET | `/api/auth/me` | Get current user profile | Private |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/refresh` | Refresh JWT token | Private |

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/profile` | Get user profile | Private |
| PUT | `/api/user/profile` | Update user profile | Private |
| PUT | `/api/user/password` | Change password | Private |
| DELETE | `/api/user/profile` | Delete account | Private |
| GET | `/api/user/stats` | Get user statistics | Private |

### Admin Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/admin/users` | Get all users | Admin |
| PUT | `/api/user/admin/users/:id` | Update user | Admin |

## 🔐 Authentication

### JWT Token Format
```
Authorization: Bearer <token>
```

### Token Payload
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## 📝 Request Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force
- **Input Validation**: Request data validation
- **CORS**: Cross-origin resource sharing
- **Security Headers**: Helmet.js protection
- **Error Handling**: Secure error responses

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date (default: now),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": [] // Validation errors (if applicable)
}
```

## 🔄 Development

### File Structure
```
backend/
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── user.js
├── middleware/
│   └── auth.js
├── server.js
├── package.json
└── config.env
```

### Adding New Routes

1. Create route file in `routes/`
2. Add validation rules
3. Implement controller logic
4. Add to `server.js`
5. Test with Postman/curl

## 🚀 Deployment

### Environment Variables
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure MongoDB Atlas
- Set proper CORS origins

### Security Checklist
- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Configure proper CORS
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Use environment variables

## 📞 Support

For issues and questions:
1. Check the logs for error details
2. Verify MongoDB connection
3. Test API endpoints with Postman
4. Check environment variables

## 📄 License

MIT License - see LICENSE file for details. 