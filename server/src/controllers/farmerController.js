const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
const { getWeatherByPincode, getWeatherAlerts } = require('../services/weatherService');
const { getMSPData, getMarketData, getTopCropsByPincode, getMarketAlerts } = require('../services/marketService');
const { sendSMS } = require('../services/smsService');

// Farmer Registration
const registerFarmer = async (req, res) => {
  try {
    const { name, mobileNumber, soilType, soilHealth, cropName, seedSowingDate, pincode } = req.body;

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ mobileNumber });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Farmer with this mobile number already exists' });
    }

    // Create new farmer
    const farmer = new Farmer({
      name,
      mobileNumber,
      soilType,
      soilHealth,
      cropName,
      seedSowingDate,
      pincode
    });

    await farmer.save();

    // Generate JWT token
    const token = jwt.sign(
      { farmerId: farmer._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Farmer registered successfully',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        mobileNumber: farmer.mobileNumber,
        cropName: farmer.cropName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Farmer Login
const loginFarmer = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    // Find farmer by mobile number
    const farmer = await Farmer.findOne({ mobileNumber });
    if (!farmer) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Update last login
    farmer.lastLogin = new Date();
    await farmer.save();

    // Generate JWT token
    const token = jwt.sign(
      { farmerId: farmer._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        mobileNumber: farmer.mobileNumber,
        cropName: farmer.cropName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get Farmer Overview
const getFarmerOverview = async (req, res) => {
  try {
    const farmer = req.farmer;
    
    // Get weather data
    const weatherData = await getWeatherByPincode(farmer.pincode);
    const weatherAlerts = getWeatherAlerts(weatherData);
    
    // Get market data
    const marketData = await getMarketData(farmer.pincode, farmer.cropName);
    const mspData = await getMSPData(farmer.cropName);
    const marketAlerts = getMarketAlerts(farmer.cropName, marketData?.currentPrice || 0, mspData);
    
    // Calculate estimated harvesting date (simplified calculation)
    const sowingDate = new Date(farmer.seedSowingDate);
    const estimatedHarvestDate = new Date(sowingDate);
    estimatedHarvestDate.setDate(sowingDate.getDate() + 120); // Assuming 120 days for most crops
    
    // Calculate NDVI index (simplified - in production, use actual satellite data)
    const ndviIndex = calculateNDVI(weatherData.current, farmer.soilHealth);
    
    // Generate recommendations
    const recommendations = generateRecommendations(weatherData, marketData, mspData, farmer);
    
    // Send SMS alert if critical conditions detected
    if (weatherAlerts.some(alert => alert.severity === 'warning') || 
        marketAlerts.some(alert => alert.severity === 'warning')) {
      const alertMessage = `Alert: ${weatherAlerts.concat(marketAlerts).filter(a => a.severity === 'warning').map(a => a.message).join(' ')}`;
      await sendSMS(farmer._id, farmer.name, farmer.mobileNumber, alertMessage, 'Weather Alert');
    }

    res.json({
      farmer: {
        name: farmer.name,
        cropName: farmer.cropName,
        soilType: farmer.soilType,
        soilHealth: farmer.soilHealth
      },
      weather: {
        current: weatherData.current,
        alerts: weatherAlerts
      },
      market: {
        currentPrice: marketData?.currentPrice || 0,
        msp: mspData?.msp || 0,
        alerts: marketAlerts
      },
      farming: {
        seedSowingDate: farmer.seedSowingDate,
        estimatedHarvestDate,
        ndviIndex,
        recommendations
      }
    });
  } catch (error) {
    console.error('Overview error:', error);
    res.status(500).json({ message: 'Error fetching overview data' });
  }
};

// Get Weather Data
const getWeatherData = async (req, res) => {
  try {
    const farmer = req.farmer;
    const weatherData = await getWeatherByPincode(farmer.pincode);
    
    res.json(weatherData);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

// Get Market Data
const getMarketDataForFarmer = async (req, res) => {
  try {
    const farmer = req.farmer;
    const marketData = await getMarketData(farmer.pincode, farmer.cropName);
    const mspData = await getMSPData(farmer.cropName);
    const topCrops = await getTopCropsByPincode(farmer.pincode);
    
    res.json({
      currentCrop: {
        name: farmer.cropName,
        currentPrice: marketData?.currentPrice || 0,
        msp: mspData?.msp || 0,
        trend: marketData?.trend || 'stable'
      },
      topCropsInArea: topCrops
    });
  } catch (error) {
    console.error('Market error:', error);
    res.status(500).json({ message: 'Error fetching market data' });
  }
};

// Helper function to calculate NDVI (simplified)
const calculateNDVI = (weather, soilHealth) => {
  // Simplified NDVI calculation based on weather and soil conditions
  let baseNDVI = 0.5;
  
  if (weather.temperature >= 20 && weather.temperature <= 30) baseNDVI += 0.2;
  if (weather.humidity >= 40 && weather.humidity <= 70) baseNDVI += 0.15;
  if (soilHealth === 'Excellent') baseNDVI += 0.15;
  if (soilHealth === 'Good') baseNDVI += 0.1;
  
  return Math.min(Math.max(baseNDVI, 0), 1); // Ensure NDVI is between 0 and 1
};

// Helper function to generate recommendations
const generateRecommendations = (weather, market, msp, farmer) => {
  const recommendations = [];
  
  // Weather-based recommendations
  if (weather.current.temperature > 35) {
    recommendations.push('Increase irrigation frequency due to high temperature');
  }
  if (weather.current.humidity < 30) {
    recommendations.push('Consider additional irrigation for low humidity');
  }
  
  // Market-based recommendations
  if (market?.currentPrice && msp?.msp) {
    if (market.currentPrice < msp.msp) {
      recommendations.push('Current price below MSP - consider government procurement');
    } else if (market.currentPrice > msp.msp * 1.2) {
      recommendations.push('Good time to sell - price significantly above MSP');
    }
  }
  
  // Soil-based recommendations
  if (farmer.soilHealth === 'Poor') {
    recommendations.push('Consider soil improvement measures and organic fertilizers');
  }
  
  return recommendations;
};

module.exports = {
  registerFarmer,
  loginFarmer,
  getFarmerOverview,
  getWeatherData,
  getMarketDataForFarmer
};

