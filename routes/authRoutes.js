const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

// public routes
router.post('/register', register);
router.post('/login', login);

// protected route
router.get('/profile', authenticate, getProfile);

module.exports = router;

