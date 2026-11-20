const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../Middleware/Auth').ensureAuthenticated;
router.get('/',ensureAuthenticated, (req, res) => {
    console.log('----- THIS IS SHOWN ONLY FOR AUTHENTICATED USERS -----',req.user);
    res.status(200).json({
        message: 'Product Router is working',
        success: true
    });
});