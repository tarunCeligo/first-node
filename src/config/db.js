const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit the app on failure
    }
};

module.exports = connectDB;
