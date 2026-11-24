
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    const mongoUrl = process.env.MONGO_CONN;

    if (!mongoUrl) {
        throw new Error('MONGO_CONN is missing');
    }

    try {
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 10000
        });

        isConnected = true;
        console.log('MongoDB connected successfully');

    } catch (error) {
        isConnected = false;
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

module.exports = connectDB;
