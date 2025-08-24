require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { initCronJobs } = require('./services/cronService');

const app = express();

// Connect to MongoDB
connectDB();

// Initialize cron jobs
initCronJobs();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'FarmHub API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 FarmHub Server running on port ${PORT}`);
  console.log(`📱 SMS Service: Mock mode (messages logged to console)`);
  console.log(`🌤️  Weather API: Mock mode (generated data)`);
  console.log(`🏪 Market API: Mock mode (static MSP data)`);
  console.log(`🗄️  Database: MongoDB Atlas`);
});

module.exports = app;
