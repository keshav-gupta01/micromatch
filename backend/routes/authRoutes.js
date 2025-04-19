const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route   POST api/signup
// @desc    Register a user
// @access  Public
router.post('/signup', signup);

// @route   POST api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

module.exports = router;
