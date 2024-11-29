// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

/**
 * Establish a connection to the MongoDB database using Mongoose.
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB database with URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Terminate process on connection failure
    }
};

module.exports = connectDB;


