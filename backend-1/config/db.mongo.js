const mongoose = require('mongoose');
require('dotenv').config();

const  mongodbUri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri);
        console.log('Success: MongoDB Atlas Connected Successfully');
    } catch (error) {
        console.error('Error: MongoDb Connection Error:', error.message);
    }
};

module.exports = connectDB;