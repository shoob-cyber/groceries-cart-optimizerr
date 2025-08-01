const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ 
          error: 'User not found',
          message: 'The user associated with this token no longer exists'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({ 
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Your session has expired. Please log in again.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({ 
      error: 'No token provided',
      message: 'Access denied. No token provided.'
    });
  }
};

// Middleware to check if user has admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      error: 'Access denied',
      message: 'Admin access required'
    });
  }
};

// Middleware to check if user has specific role
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ 
        error: 'Access denied',
        message: `${role} access required`
      });
    }
  };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't fail the request
      console.log('Optional auth: Invalid token');
    }
  }

  next();
};

// Middleware to validate token without requiring authentication
const validateToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
        return res.json({ 
          valid: true, 
          user: user,
          message: 'Token is valid'
        });
      } else {
        return res.status(401).json({ 
          valid: false,
          message: 'User not found or account deactivated'
        });
      }
    } catch (error) {
      return res.status(401).json({ 
        valid: false,
        message: 'Invalid token'
      });
    }
  }

  return res.status(401).json({ 
    valid: false,
    message: 'No token provided'
  });
};

module.exports = {
  protect,
  admin,
  requireRole,
  optionalAuth,
  validateToken
}; 