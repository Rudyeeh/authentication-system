
const express = require('express');
const router = express.Router();

const ensureAuthenticated =
    require('../Middleware/Auth').ensureAuthenticated;

// Three products
const products = [
    {
        _id: 1,
        name: 'Pencil',
        price: 10
    },
    {
        _id: 2,
        name: 'Pen',
        price: 20
    },
    {
        _id: 3,
        name: 'Eraser',
        price: 5
    }
];

// GET PRODUCTS (Authenticated)
router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        products: products
    });
});

// TEST ROUTE
router.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Product Router is working'
    });
});

module.exports = router;
