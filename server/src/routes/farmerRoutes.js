const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  registerFarmer,
  loginFarmer,
  getFarmerOverview,
  getWeatherData,
  getMarketDataForFarmer
} = require('../controllers/farmerController');

// Public routes
router.post('/register', registerFarmer);
router.post('/login', loginFarmer);

// Protected routes
router.get('/overview', auth, getFarmerOverview);
router.get('/weather', auth, getWeatherData);
router.get('/market', auth, getMarketDataForFarmer);

module.exports = router;

