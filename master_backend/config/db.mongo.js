const mongoose = require('mongoose');
require('dotenv').config();

const isMongoConfigured = () => {
    return(
        typeof process.env.MONGODB_URI === 'string' &&
        process.env.MONGODB_URI.trim() !== '' &&
        !process.env.MONGODB_URI.includes('<')
    );
};

const connectDB = async () => {
  if (!isMongoConfigured()) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Success: MongoDB Atlas Connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);

    throw error;
  }
};



const ensureDatabase =(res) => {
    if(mongoose.connection.readyState !== 1){
        res.status(500).json({
            success: false, 
            error: 'Database connection not established' 
        });
        return false;
    }
    return true;
};

module.exports = { connectDB, ensureDatabase, isMongoConfigured };