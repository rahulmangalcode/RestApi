const express = require('express');
const connectDB = require('./config/db.mongo');
const userRoutes = require('./routes/user.route');
require('dotenv').config();

const app = express();

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Backend API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    })
});

app.use('/api', userRoutes);
const PORT=process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});