const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected route - commented out for now
// const auth = require('../middleware/auth');
// router.get('/profile', auth, authController.getProfile);

module.exports = router;