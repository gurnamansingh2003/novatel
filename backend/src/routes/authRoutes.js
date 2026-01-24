const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  verifyToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;