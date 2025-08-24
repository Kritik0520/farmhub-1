// Mock market service without external API dependencies
const mockMSPData = {
  'Rice': { msp: 2040, unit: 'per quintal' },
  'Wheat': { msp: 2125, unit: 'per quintal' },
  'Maize': { msp: 1870, unit: 'per quintal' },
  'Cotton': { msp: 6620, unit: 'per quintal' },
  'Sugarcane': { msp: 315, unit: 'per quintal' },
  'Pulses': { msp: 6400, unit: 'per quintal' },
  'Oilseeds': { msp: 5450, unit: 'per quintal' }
};

const mockMarketData = {
  '110001': { // New Delhi
    'Rice': { currentPrice: 2200, trend: 'up', lastUpdated: new Date() },
    'Wheat': { currentPrice: 2300, trend: 'down', lastUpdated: new Date() },
    'Maize': { currentPrice: 1900, trend: 'stable', lastUpdated: new Date() }
  },
  '400001': { // Mumbai
    'Rice': { currentPrice: 2350, trend: 'up', lastUpdated: new Date() },
    'Wheat': { currentPrice: 2250, trend: 'up', lastUpdated: new Date() },
    'Cotton': { currentPrice: 6800, trend: 'down', lastUpdated: new Date() }
  },
  '700001': { // Kolkata
    'Rice': { currentPrice: 2100, trend: 'stable', lastUpdated: new Date() },
    'Pulses': { currentPrice: 6500, trend: 'up', lastUpdated: new Date() },
    'Oilseeds': { currentPrice: 5600, trend: 'up', lastUpdated: new Date() }
  }
};

const getMSPData = async (cropName) => {
  try {
    // In production, fetch from government API
    // const response = await axios.get(`${process.env.GOVT_API_URL}/msp/${cropName}`);
    // return response.data;
    
    return mockMSPData[cropName] || null;
  } catch (error) {
    console.error('Error fetching MSP data:', error);
    return null;
  }
};

const getMarketData = async (pincode, cropName) => {
  try {
    // In production, fetch from government market API
    // const response = await axios.get(`${process.env.GOVT_MARKET_API_URL}/pincode/${pincode}/crop/${cropName}`);
    // return response.data;
    
    const marketData = mockMarketData[pincode];
    if (marketData && marketData[cropName]) {
      return marketData[cropName];
    }
    
    // Return default data if specific pincode/crop not found
    return {
      currentPrice: 0,
      trend: 'stable',
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    return null;
  }
};

const getTopCropsByPincode = async (pincode) => {
  try {
    // In production, fetch from government API
    // const response = await axios.get(`${process.env.GOVT_API_URL}/top-crops/${pincode}`);
    // return response.data;
    
    const marketData = mockMarketData[pincode];
    if (marketData) {
      return Object.keys(marketData).map(crop => ({
        name: crop,
        ...marketData[crop]
      }));
    }
    
    // Return default top crops
    return [
      { name: 'Rice', currentPrice: 2200, trend: 'stable' },
      { name: 'Wheat', currentPrice: 2300, trend: 'stable' },
      { name: 'Maize', currentPrice: 1900, trend: 'stable' }
    ];
  } catch (error) {
    console.error('Error fetching top crops:', error);
    return [];
  }
};

const getMarketAlerts = (cropName, currentPrice, msp) => {
  const alerts = [];
  
  if (msp && currentPrice < msp.msp) {
    alerts.push({
      type: 'Low Price Alert',
      message: `Current price (₹${currentPrice}) is below MSP (₹${msp.msp}). Consider holding or government procurement.`,
      severity: 'warning'
    });
  }
  
  if (msp && currentPrice > msp.msp * 1.2) {
    alerts.push({
      type: 'High Price Alert',
      message: `Current price (₹${currentPrice}) is significantly above MSP (₹${msp.msp}). Good time to sell.`,
      severity: 'info'
    });
  }
  
  return alerts;
};

module.exports = {
  getMSPData,
  getMarketData,
  getTopCropsByPincode,
  getMarketAlerts
};
