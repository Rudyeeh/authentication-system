
const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    const mongoUrl = process.env.MONGO_CONN;

    if (!mongoUrl) {
        throw new Error('MONGO_CONN environment variable is missing');
    }

    await mongoose.connect(mongoUrl);

    console.log('Connected to MongoDB successfully');
};

module.exports = connectDB;
