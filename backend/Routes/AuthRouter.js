
const {
    signup,
    login,
    logout
} = require('../Controllers/AuthController');

const {
    validateLogin,
    validateSignup,
    validateLogout
} = require('../Middleware/AuthValidation');

const router = require('express').Router();

// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

// Logout route
router.post('/logout', validateLogout, logout);

module.exports = router;
