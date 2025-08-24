const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getRealTimeWeather,
  getAllSmartAlerts,
  searchFarmers,
  getSMSStatistics,
  sendBulkSMS,
  getDashboardSummary
} = require('../controllers/adminController');

// All admin routes require authentication
router.use(adminAuth);

// Weather data
router.get('/weather', getRealTimeWeather);

// Smart alerts
router.get('/alerts', getAllSmartAlerts);

// Farmer search
router.get('/search-farmers', searchFarmers);

// SMS management
router.get('/sms-statistics', getSMSStatistics);
router.post('/send-bulk-sms', sendBulkSMS);

// Dashboard
router.get('/dashboard', getDashboardSummary);

module.exports = router;

