
const express = require('express');
const cors = require('cors');
const connectDB = require('./Models/db');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB before handling database requests
app.use(['/auth', '/products'], async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error:', error.message);

        return res.status(503).json({
            success: false,
            message: 'Database unavailable. Please try again later.'
        });
    }
});

const authRouter = require('./Routes/AuthRouter.js');
const productRouter = require('./Routes/ProductRouter.js');

app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/ping', (req, res) => {
    res.send('pong');
});

// Vercel serverless export
module.exports = app;

// Local development
if (require.main === module) {
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
