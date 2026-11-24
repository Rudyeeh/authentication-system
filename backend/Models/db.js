const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        const mongoUrl = process.env.MONGO_CONN;

        if (!mongoUrl) {
            throw new Error('MONGO_CONN is missing');
        }

        console.log('Attempting MongoDB connection...');

        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 15000
        });

        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
};

module.exports = connectDB;
