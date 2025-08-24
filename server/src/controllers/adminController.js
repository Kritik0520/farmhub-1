const Farmer = require('../models/Farmer');
const SMS = require('../models/SMS');
const { getWeatherByPincode, getWeatherAlerts } = require('../services/weatherService');
const { getMSPData, getMarketData, getTopCropsByPincode } = require('../services/marketService');
const { sendSMS, getRecentSMS } = require('../services/smsService');

// Get Real-time Weather Data
const getRealTimeWeather = async (req, res) => {
  try {
    const { pincode } = req.query;
    
    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    const weatherData = await getWeatherByPincode(pincode);
    const alerts = getWeatherAlerts(weatherData);
    
    res.json({
      weather: weatherData,
      alerts,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

// Get All Smart Alerts
const getAllSmartAlerts = async (req, res) => {
  try {
    const { pincode } = req.query;
    const alerts = [];
    
    if (pincode) {
      // Get weather alerts for specific pincode
      const weatherData = await getWeatherByPincode(pincode);
      const weatherAlerts = getWeatherAlerts(weatherData);
      
      // Get market alerts for crops in that area
      const topCrops = await getTopCropsByPincode(pincode);
      const marketAlerts = [];
      
      for (const crop of topCrops) {
        const mspData = await getMSPData(crop.name);
        if (mspData) {
          if (crop.currentPrice < mspData.msp) {
            marketAlerts.push({
              type: 'Low Price Alert',
              message: `${crop.name} price (₹${crop.currentPrice}) below MSP (₹${mspData.msp})`,
              severity: 'warning',
              pincode
            });
          }
        }
      }
      
      alerts.push(...weatherAlerts, ...marketAlerts);
    } else {
      // Get alerts for all major pincodes
      const majorPincodes = ['110001', '400001', '700001', '600001', '500001', '560001'];
      
      for (const pincode of majorPincodes) {
        try {
          const weatherData = await getWeatherByPincode(pincode);
          const weatherAlerts = getWeatherAlerts(weatherData);
          alerts.push(...weatherAlerts.map(alert => ({ ...alert, pincode })));
        } catch (error) {
          console.error(`Error fetching weather for ${pincode}:`, error);
        }
      }
    }
    
    res.json({
      alerts: alerts.sort((a, b) => {
        const severityOrder = { 'warning': 3, 'info': 2, 'success': 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }),
      totalAlerts: alerts.length,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Alerts fetch error:', error);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

// Search Farmers
const searchFarmers = async (req, res) => {
  try {
    const { query, pincode, cropName, soilType } = req.query;
    let searchCriteria = {};
    
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { mobileNumber: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (pincode) {
      searchCriteria.pincode = pincode;
    }
    
    if (cropName) {
      searchCriteria.cropName = { $regex: cropName, $options: 'i' };
    }
    
    if (soilType) {
      searchCriteria.soilType = soilType;
    }
    
    const farmers = await Farmer.find(searchCriteria)
      .select('name mobileNumber cropName pincode soilType soilHealth seedSowingDate createdAt lastLogin')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      farmers,
      totalResults: farmers.length,
      searchCriteria
    });
  } catch (error) {
    console.error('Farmer search error:', error);
    res.status(500).json({ message: 'Error searching farmers' });
  }
};

// Get SMS Statistics
const getSMSStatistics = async (req, res) => {
  try {
    const recentSMS = await getRecentSMS(10);
    
    // Get SMS statistics
    const totalSMS = await SMS.countDocuments();
    const successfulSMS = await SMS.countDocuments({ status: 'Sent' });
    const failedSMS = await SMS.countDocuments({ status: 'Failed' });
    
    // Get SMS by type
    const smsByType = await SMS.aggregate([
      {
        $group: {
          _id: '$messageType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get SMS by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const smsLastWeek = await SMS.countDocuments({
      sentAt: { $gte: sevenDaysAgo }
    });
    
    res.json({
      recentSMS,
      statistics: {
        total: totalSMS,
        successful: successfulSMS,
        failed: failedSMS,
        successRate: totalSMS > 0 ? ((successfulSMS / totalSMS) * 100).toFixed(2) : 0
      },
      smsByType,
      smsLastWeek,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('SMS statistics error:', error);
    res.status(500).json({ message: 'Error fetching SMS statistics' });
  }
};

// Send Bulk SMS
const sendBulkSMS = async (req, res) => {
  try {
    const { message, messageType, farmerIds, pincode, cropName } = req.body;
    
    if (!message || !messageType) {
      return res.status(400).json({ message: 'Message and message type are required' });
    }
    
    let farmers = [];
    
    if (farmerIds && farmerIds.length > 0) {
      // Send to specific farmers
      farmers = await Farmer.find({ _id: { $in: farmerIds } });
    } else if (pincode) {
      // Send to all farmers in a pincode
      const searchCriteria = { pincode };
      if (cropName) {
        searchCriteria.cropName = cropName;
      }
      farmers = await Farmer.find(searchCriteria);
    } else {
      return res.status(400).json({ message: 'Either farmer IDs or pincode is required' });
    }
    
    if (farmers.length === 0) {
      return res.status(404).json({ message: 'No farmers found for the given criteria' });
    }
    
    // Send SMS to all farmers
    const results = [];
    for (const farmer of farmers) {
      const result = await sendSMS(
        farmer._id,
        farmer.name,
        farmer.mobileNumber,
        message,
        messageType
      );
      results.push({
        farmerId: farmer._id,
        farmerName: farmer.name,
        mobileNumber: farmer.mobileNumber,
        result
      });
    }
    
    res.json({
      message: `SMS sent to ${farmers.length} farmers`,
      results,
      totalSent: results.filter(r => r.result.success).length,
      totalFailed: results.filter(r => !r.result.success).length
    });
  } catch (error) {
    console.error('Bulk SMS error:', error);
    res.status(500).json({ message: 'Error sending bulk SMS' });
  }
};

// Get Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments();
    const activeFarmers = await Farmer.countDocuments({ isActive: true });
    
    // Get recent registrations
    const recentRegistrations = await Farmer.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name cropName pincode createdAt');
    
    // Get top crops
    const topCrops = await Farmer.aggregate([
      {
        $group: {
          _id: '$cropName',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    // Get top pincodes
    const topPincodes = await Farmer.aggregate([
      {
        $group: {
          _id: '$pincode',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    res.json({
      summary: {
        totalFarmers,
        activeFarmers,
        activeRate: totalFarmers > 0 ? ((activeFarmers / totalFarmers) * 100).toFixed(2) : 0
      },
      recentRegistrations,
      topCrops,
      topPincodes,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Error fetching dashboard summary' });
  }
};

module.exports = {
  getRealTimeWeather,
  getAllSmartAlerts,
  searchFarmers,
  getSMSStatistics,
  sendBulkSMS,
  getDashboardSummary
};

