const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const AppError = require('./utils/appError');
const eventRoutes = require('./routes/eventsRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://liadtech.lafkiri.com'
})); // Cross-Origin Resource Sharing
app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.use('/api/v1/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Sports Event Management API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;