const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware to protect routes - checking if user is logged in
const authenticate = async (req, res, next) => {
  try {
    // getting token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // finding user by id from token
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // adding user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// checking if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

module.exports = { authenticate, isAdmin };

